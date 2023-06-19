"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildRecoverFunctions = void 0;
const utils_1 = require("../../../utils");
const terminals_1 = require("../terminals");
const substrings_1 = require("./substrings");
const buildRecoverFunctions = (def) => def.struct
    .map(el => `

    function recover${el.name} (
        ${el.name} calldata message,
        bytes calldata signature,
        ${(0, utils_1.optionalString)(el.external, utils_1.formatSolidityParameters)}
        bytes32 domainSeparator
    ) public pure returns (address) {

        bytes32 structHash = keccak256(
            encode${el.name}Parameters(message ${(0, utils_1.optionalComma)(el.external)} ${(0, utils_1.optionalString)(el.external, substrings_1.composeCustomEncodeArgument)})
        );
    
        return hashAndRecover(structHash, signature, domainSeparator);
    }`)
    .join(terminals_1.BR);
exports.buildRecoverFunctions = buildRecoverFunctions;
//# sourceMappingURL=recover.builder.js.map