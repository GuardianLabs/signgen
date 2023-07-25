import { STRUCTS_FILENAME, TYPEHASH_DEFINITIONS_FILENAME } from "../../../cli/config";
import { IDefinition } from "../../types";
import { buildEncodeFunctions, buildRecoverFunctions, buildVerifyFunctions } from "../constructions/nonterminals";
import { UNLICENSED_LICENSE, SOLIDITY_19, ECDSA_OZ, BUILD_DOMAIN_SEPARATOR_PROXY } from "../constructions/terminals";

export const composeLib = (def: IDefinition, name: string) => {

    return `

    ${UNLICENSED_LICENSE}
    ${SOLIDITY_19}

    ${ECDSA_OZ}
    import "./${STRUCTS_FILENAME}.sol";
    import "./${TYPEHASH_DEFINITIONS_FILENAME}.sol";
    import { Util } from "./UtilLib.sol";

    contract SignatureVerification { // _${name}

        ${BUILD_DOMAIN_SEPARATOR_PROXY}
        // For elimination of "Stack too deep" error

        ${buildEncodeFunctions(def)}

        ${buildRecoverFunctions(def)}

        ${buildVerifyFunctions(def)}
    }
    `;
}