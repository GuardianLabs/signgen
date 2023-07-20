"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildEnumStubs = void 0;
const utils_1 = require("../../../utils");
const terminals_1 = require("../terminals");
const buildEnumStubs = (def) => def.struct
    .flatMap(el => el.props.concat(el.external))
    .filter(el => el.enum)
    .filter((0, utils_1.uniquePropertyWise)('type'))
    .map(el => `
    enum ${el.type} {
        ${(0, utils_1.stubUndefinedEnum)().join("," + terminals_1.BR + terminals_1.TAB)}
    }`)
    .join(terminals_1.BR);
exports.buildEnumStubs = buildEnumStubs;
//# sourceMappingURL=enum.builder.js.map