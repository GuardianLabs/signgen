"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildStubTypeHash = exports.buildTypeHash = void 0;
const utils_1 = require("../../../utils");
const terminals_1 = require("../terminals");
const typeHashScaffold = (el) => `${el.name}(${el.props.map(prop => `${prop.enum ? "uint8" : prop.type} ${prop.name}`).join(',')}${el.external.length == 0 ? '' : ',' + el.external.map(ext => `${ext.enum ? "uint8" : ext.type} ${ext.name}`).join(',')})`;
const buildTypeHashRecursively = (el, def, includedStructs, acc = 0) => {
    if (acc != 0)
        includedStructs.push(el);
    for (const prop of el.props.concat(el.external)) {
        if (prop.struct) {
            const struct = def.struct.concat(def.related).find(struct => struct.name == prop.type && struct.name != el.name);
            if (struct) {
                buildTypeHashRecursively(struct, def, includedStructs, ++acc);
            }
            else {
                includedStructs.push({
                    name: prop.type,
                    props: (0, utils_1.stubUndefinedStruct)(),
                    external: []
                });
            }
        }
    }
};
const buildTypeHash = (def) => def.struct.concat(def.related)
    .map(el => {
    let includedStructs = [];
    buildTypeHashRecursively(el, def, includedStructs);
    includedStructs = includedStructs
        .filter((0, utils_1.uniquePropertyWise)('name'))
        .sort((a, b) => a.name.localeCompare(b.name));
    let res = includedStructs.map(inc => typeHashScaffold(inc))
        .join('');
    res = typeHashScaffold(el) + res;
    return `
        bytes32 constant ${(0, utils_1.formatCapitalSnake)(el.name)}_TYPEHASH = keccak256(
            "${res}");`;
})
    .join(terminals_1.BR);
exports.buildTypeHash = buildTypeHash;
const buildStubTypeHash = (def) => def.struct
    .flatMap(el => el.props.concat(el.external))
    .filter(el => el.struct)
    .filter(el => !def.struct.map(el => el.name).includes(el.type))
    .filter(el => !def.related.map(el => el.name).includes(el.type))
    .filter((0, utils_1.uniquePropertyWise)('type'))
    .filter(utils_1.unique)
    .map(el => `
    bytes32 constant ${(0, utils_1.formatCapitalSnake)(el.type)}_TYPEHASH = keccak256("${el.type}(${(0, utils_1.stubUndefinedStruct)().map(prop => `${prop.type} ${prop.name}`).join(',')})");
    `)
    .join(terminals_1.BR);
exports.buildStubTypeHash = buildStubTypeHash;
//# sourceMappingURL=typehash.builder.js.map