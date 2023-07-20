"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildVerifyFunctions = void 0;
const utils_1 = require("../../../utils");
const terminals_1 = require("../terminals");
const substrings_1 = require("./substrings");
const buildVerifyFunctions = (def) => def.struct
    .map(el => `
    function verify${el.name} (
        ${el.name} calldata message,
        bytes calldata signature,
        ${(0, utils_1.optionalString)(el.external, utils_1.formatSolidityParameters)}
        bytes32 domainSeparator,
        address addr,
        string calldata errMessage
    ) public pure {

        require(
            recover${el.name}(message, signature, ${(0, utils_1.optionalString)(el.external, substrings_1.composeArgument)} domainSeparator) == addr,
            errMessage
        );
    }`)
    .join(terminals_1.BR);
exports.buildVerifyFunctions = buildVerifyFunctions;
//# sourceMappingURL=verify.builder.js.map