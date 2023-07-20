"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.composeLib = void 0;
const config_1 = require("../../../cli/config");
const nonterminals_1 = require("../constructions/nonterminals");
const terminals_1 = require("../constructions/terminals");
const composeLib = (def, name) => {
    return `

    ${terminals_1.UNLICENSED_LICENSE}
    ${terminals_1.SOLIDITY_19}

    ${terminals_1.ECDSA_OZ}
    import "./${config_1.STRUCTS_FILENAME}.sol";
    import "./${config_1.TYPEHASH_DEFINITIONS_FILENAME}.sol";

    contract SignatureVerification_${name} {

        ${terminals_1.HASH_TYPED_DATA_V4}
        ${terminals_1.HASH_AND_RECOVER}

        ${def.domain.salt ? terminals_1.BUILD_DOMAIN_SEPARATOR_WITH_SALT : terminals_1.BUILD_DOMAIN_SEPARATOR}

        ${terminals_1.ENCODE_STRING_ARRAY}

        ${terminals_1.ENCODE_BYTES_ARRAY}

        // For elimination of "Stack too deep" error

        ${(0, nonterminals_1.buildEncodeFunctions)(def)}

        ${(0, nonterminals_1.buildRecoverFunctions)(def)}

        ${(0, nonterminals_1.buildVerifyFunctions)(def)}
    }
    `;
};
exports.composeLib = composeLib;
//# sourceMappingURL=lib.compose.js.map