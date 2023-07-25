"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stubUndefinedEnum = exports.stubUndefinedStruct = exports.pasteDefaultStub = exports.getDefaultStub = void 0;
const parser_1 = require("../scripts/parser");
const getDefaultStub = (type, def, prop) => {
    let baseType;
    for (const key of Object.keys(Default)) {
        if (type.includes(key)) {
            baseType = Default[key];
            break;
        }
        else {
            if (prop.struct) {
                const target = def.struct.concat(def.related).find(el => el.name == type);
                let targetProps = target ? target.props : (0, exports.stubUndefinedStruct)();
                baseType = `{
                    ${targetProps.map(el => `${el.name}: ${(0, exports.pasteDefaultStub)(el.type, def, el)}`).join(',')}
                }`;
            }
            else if (prop.enum) {
                baseType = Default.uint;
            }
            else {
                baseType = undefined;
            }
        }
    }
    return baseType;
};
exports.getDefaultStub = getDefaultStub;
const pasteDefaultStub = (type, def, prop) => {
    const stub = (0, exports.getDefaultStub)(type, def, prop);
    const tsType = (0, parser_1.inferType)(type);
    let outTypeStub;
    if (!tsType.includes("BigNumberish") &&
        !tsType.includes("number") &&
        !tsType.includes("boolean") &&
        !prop.struct &&
        !prop.enum &&
        stub != undefined) {
        outTypeStub = `"${stub}"`;
    }
    else {
        outTypeStub = stub;
    }
    if (type.includes('['))
        return `[${outTypeStub}]`;
    return outTypeStub;
};
exports.pasteDefaultStub = pasteDefaultStub;
const Default = {
    "string": "stub",
    bytes: `0x${"0".repeat(64)}`,
    address: `0x${"0".repeat(40)}`,
    bool: "false",
    uint: "0",
    int: "0"
};
const stubUndefinedStruct = () => ([{ name: "exists", type: "bool" }]);
exports.stubUndefinedStruct = stubUndefinedStruct;
const stubUndefinedEnum = () => ["EXISTS"];
exports.stubUndefinedEnum = stubUndefinedEnum;
//# sourceMappingURL=type.defaults.js.map