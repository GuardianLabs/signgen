"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildEncodeFunctions = void 0;
const utils_1 = require("../../../utils");
const terminals_1 = require("../terminals");
const substrings_1 = require("./substrings");
const buildEncodeFunctions = (def) => def.struct
    .map(el => `

    function encode${el.name}Parameters (
        ${el.name} calldata message ${(0, utils_1.optionalComma)(el.external)}
        ${(0, utils_1.optionalString)(el.external, substrings_1.composeParameters)}
    ) internal pure returns (bytes memory) {

        return abi.encode(
            ${(0, utils_1.formatCapitalSnake)(el.name)}_TYPEHASH,
            ${el.props.map(prop => (0, utils_1.wrapArgument)(`message.${prop.name}`, prop.type, def, prop)).join(`,${terminals_1.BR}`)}
            ${(0, utils_1.optionalComma)(el.external)}
            ${(0, utils_1.optionalString)(el.external, (0, substrings_1.composeEncodeArgument)(def))}
        );
    }`)
    .join(terminals_1.BR);
exports.buildEncodeFunctions = buildEncodeFunctions;
//# sourceMappingURL=encode.builder.js.map