import { STRUCTS_FILENAME, TYPEHASH_DEFINITIONS_FILENAME } from "../../../cli/config";
import { IDefinition } from "../../types";
import { buildRecoverFunctions, buildVerifyFunctions } from "../constructions/nonterminals";
import { UNLICENSED_LICENSE, SOLIDITY_19, ECDSA_OZ, HASH_TYPED_DATA_V4, HASH_AND_RECOVER } from "../constructions/terminals";

export const composeLib = (def: IDefinition, name: string) => {

    return `

    ${UNLICENSED_LICENSE}
    ${SOLIDITY_19}

    ${ECDSA_OZ}
    import "./${STRUCTS_FILENAME}.sol";
    import "./${TYPEHASH_DEFINITIONS_FILENAME}.sol";

    library LibSignatureVerification_${name} {

        ${HASH_TYPED_DATA_V4}
        ${HASH_AND_RECOVER}

        ${buildRecoverFunctions(def)}

        ${buildVerifyFunctions(def)}
    }
    `;
}