"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildStructStubs = exports.buildRelatedStruct = exports.buildSignedStruct = exports.buildStruct = void 0;
const utils_1 = require("../../../utils");
const terminals_1 = require("../terminals");
const substrings_1 = require("./substrings");
const buildStruct = (def) => def.struct
    .map(el => `
    struct ${el.name} {
        ${(0, substrings_1.composeStructFields)(el.props)}
    }`)
    .join(terminals_1.BR);
exports.buildStruct = buildStruct;
const buildSignedStruct = (def) => def.struct
    .map(el => `
    struct ${el.name}Signed {
        ${el.name} message;
        bytes signature;
    }`)
    .join(terminals_1.BR);
exports.buildSignedStruct = buildSignedStruct;
const buildRelatedStruct = (def) => def.related
    .map(el => `
    struct ${el.name} {
        ${(0, substrings_1.composeStructFields)(el.props)}
    }`)
    .join(terminals_1.BR);
exports.buildRelatedStruct = buildRelatedStruct;
const buildStructStubs = (def) => def.struct
    .flatMap(el => el.props.concat(el.external))
    .filter(el => el.struct)
    .filter(el => !def.struct.map(el => el.name).includes(el.type))
    .filter(el => !def.related.map(el => el.name).includes(el.type))
    .filter((0, utils_1.uniquePropertyWise)('type'))
    .filter(utils_1.unique)
    .map(el => `
    struct ${el.type} {
        ${(0, utils_1.stubUndefinedStruct)().map(prop => `${prop.type} ${prop.name};`).join(terminals_1.BR + terminals_1.TAB)}
    }`)
    .join(terminals_1.BR);
exports.buildStructStubs = buildStructStubs;
//# sourceMappingURL=struct.builder.js.map