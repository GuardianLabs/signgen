import { STRUCTS_FILENAME, TYPEHASH_DEFINITIONS_FILENAME } from "../../../cli/config";
import { IDefinition } from "../../types";
import { buildEncodeFunctions, buildRecoverFunctions, buildVerifyFunctions } from "../constructions/nonterminals";
import { buildDomainSeparatorFunctions } from "../constructions/nonterminals/domain.builder";
import { UNLICENSED_LICENSE, SOLIDITY_19, ECDSA_OZ, HASH_TYPED_DATA_V4, HASH_AND_RECOVER, BUILD_DOMAIN_SEPARATOR, ENCODE_STRING_ARRAY, ENCODE_BYTES_ARRAY, BUILD_DOMAIN_SEPARATOR_WITH_SALT } from "../constructions/terminals";

export const composeLib = (def: IDefinition, name: string) => {

    return `

    ${UNLICENSED_LICENSE}
    ${SOLIDITY_19}

    ${ECDSA_OZ}
    import "./${STRUCTS_FILENAME}.sol";
    import "./${TYPEHASH_DEFINITIONS_FILENAME}.sol";
    import { Util } from "./UtilLib.sol";

    contract SignatureVerification_${name} {

        ${buildDomainSeparatorFunctions(def)}

        // For elimination of "Stack too deep" error

        ${buildEncodeFunctions(def)}

        ${buildRecoverFunctions(def)}

        ${buildVerifyFunctions(def)}
    }
    `;
}