"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractStructNameIfAvailable = exports.parseEvmType = exports.StructName = exports.normalizeName = void 0;
const lodash_1 = require("lodash");
function normalizeName(rawName) {
    const transformations = [
        (s) => s.replace(/\s+/g, '-'),
        (s) => s.replace(/\./g, '-'),
        (s) => s.replace(/-[a-z]/g, (match) => match.substr(-1).toUpperCase()),
        (s) => s.replace(/-/g, ''),
        (s) => s.replace(/^\d+/, ''),
        (s) => (0, lodash_1.upperFirst)(s),
    ];
    const finalName = transformations.reduce((s, t) => t(s), rawName);
    if (finalName === '') {
        throw new Error(`Can't guess class name, please rename file: ${rawName}`);
    }
    return finalName;
}
exports.normalizeName = normalizeName;
class StructName {
    constructor(_identifier, _namespace) {
        this.identifier = normalizeName(_identifier);
        if (_namespace)
            this.namespace = normalizeName(_namespace);
    }
    toString() {
        if (this.namespace) {
            return `${this.namespace}.${this.identifier}`;
        }
        return this.identifier;
    }
    merge(other) {
        return new StructName(other.identifier || this.identifier, other.namespace || this.namespace);
    }
}
exports.StructName = StructName;
const isUIntTypeRegex = /^uint([0-9]*)$/;
const isIntTypeRegex = /^int([0-9]*)$/;
const isBytesTypeRegex = /^bytes([0-9]+)$/;
function parseEvmType(rawType, components, internalType) {
    const lastChar = rawType[rawType.length - 1];
    if (lastChar === ']') {
        let finishArrayTypeIndex = rawType.length - 2;
        while (rawType[finishArrayTypeIndex] !== '[') {
            finishArrayTypeIndex--;
        }
        const arraySizeRaw = rawType.slice(finishArrayTypeIndex + 1, rawType.length - 1);
        const arraySize = arraySizeRaw !== '' ? parseInt(arraySizeRaw) : undefined;
        const restOfTheType = rawType.slice(0, finishArrayTypeIndex);
        const result = {
            type: 'array',
            itemType: parseEvmType(restOfTheType, components, internalType),
            originalType: rawType,
        };
        if (arraySize)
            result.size = arraySize;
        const structName = extractStructNameIfAvailable(internalType);
        if (structName)
            result.structName = structName;
        return result;
    }
    switch (rawType) {
        case 'bool':
            return { type: 'boolean', originalType: rawType };
        case 'address':
            return { type: 'address', originalType: rawType };
        case 'string':
            return { type: 'string', originalType: rawType };
        case 'byte':
            return { type: 'bytes', size: 1, originalType: rawType };
        case 'bytes':
            return { type: 'dynamic-bytes', originalType: rawType };
        case 'tuple':
            if (!components)
                throw new Error('Tuple specified without components!');
            const result = { type: 'tuple', components, originalType: rawType };
            const structName = extractStructNameIfAvailable(internalType);
            if (structName)
                result.structName = structName;
            return result;
    }
    if (isUIntTypeRegex.test(rawType)) {
        const match = isUIntTypeRegex.exec(rawType);
        return { type: 'uinteger', bits: parseInt(match[1] || '256'), originalType: rawType };
    }
    if (isIntTypeRegex.test(rawType)) {
        const match = isIntTypeRegex.exec(rawType);
        return { type: 'integer', bits: parseInt(match[1] || '256'), originalType: rawType };
    }
    if (isBytesTypeRegex.test(rawType)) {
        const match = isBytesTypeRegex.exec(rawType);
        return { type: 'bytes', size: parseInt(match[1] || '1'), originalType: rawType };
    }
    if (internalType === null || internalType === void 0 ? void 0 : internalType.startsWith('enum')) {
        return parseEvmType('uint8');
    }
    if (internalType === null || internalType === void 0 ? void 0 : internalType.startsWith('contract')) {
        return { type: 'address', originalType: rawType };
    }
    return { type: 'unknown', originalType: rawType };
}
exports.parseEvmType = parseEvmType;
function extractStructNameIfAvailable(internalType) {
    var _a;
    if (internalType === null || internalType === void 0 ? void 0 : internalType.startsWith('struct ')) {
        let nameStr = internalType.slice(7);
        const arrayMarker = (_a = nameStr.match(/((?:\[\d*\])+)$/)) === null || _a === void 0 ? void 0 : _a[1];
        if (arrayMarker) {
            nameStr = nameStr.slice(0, nameStr.length - arrayMarker.length);
        }
        if (nameStr.indexOf('.') !== -1) {
            const [namespace, identifier] = nameStr.split('.');
            return new StructName(identifier, namespace);
        }
        return new StructName(nameStr);
    }
}
exports.extractStructNameIfAvailable = extractStructNameIfAvailable;
//# sourceMappingURL=parseEvmTypes.js.map