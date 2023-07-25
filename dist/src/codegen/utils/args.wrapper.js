"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapArgument = void 0;
const string_format_1 = require("./string.format");
const type_defaults_1 = require("./type.defaults");
const wrapArgument = (arg, type, def, prop) => {
    if (type == "string") {
        return `keccak256(bytes(${arg}))`;
    }
    if (type == "bytes") {
        return `keccak256(${arg})`;
    }
    if (type.includes('[')) {
        if (type.includes('string')) {
            return `encodeStringArray(${arg})`;
        }
        if (type.includes('bytes') && !(/\d/.test(type))) {
            return `encodeBytesArray(${arg})`;
        }
        return `keccak256(abi.encodePacked(${arg}))`;
    }
    if (prop.struct) {
        const target = def.struct.concat(def.related).find(el => el.name == type);
        let targetProps = target ? target.props : (0, type_defaults_1.stubUndefinedStruct)();
        return `keccak256(abi.encode(${(0, string_format_1.formatCapitalSnake)(type)}_TYPEHASH, ${targetProps.map(el => (0, exports.wrapArgument)(`${arg}.${el.name}`, el.type, def, el)).join(', ')}))`;
    }
    if (prop.enum) {
        return `uint8(${arg})`;
    }
    return arg;
};
exports.wrapArgument = wrapArgument;
//# sourceMappingURL=args.wrapper.js.map