import { STRUCTS_FILENAME, TYPEHASH_DEFINITIONS_FILENAME } from "../../../cli/config";
import { IContractsOutput, IDefinition } from "../../types";
import {
    buildRecoverFunctions,
    buildSignedStruct,
    buildStruct,
    buildTypeHash,
    buildVerifyFunctions
} from "../constructions/nonterminals";
import {
    ECDSA_OZ,
    ERC1271,
    HASH_AND_RECOVER,
    HASH_TYPED_DATA_V4, 
    SOLIDITY_19, 
    UNLICENSED_LICENSE
} from "../constructions/terminals";

export function build(def: IDefinition, name: string): IContractsOutput {

    const recoveryLib = `

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

    const typeHashDefinitions = `
    
    ${UNLICENSED_LICENSE}
    ${SOLIDITY_19}

    ${buildTypeHash(def)}
    `;

    const params = `
    
    ${UNLICENSED_LICENSE}
    ${SOLIDITY_19}
    
    ${buildStruct(def)}

    ${buildSignedStruct(def)}
    `;

    const mayNeed = `

    ${UNLICENSED_LICENSE}
    ${SOLIDITY_19}
    
    ${ERC1271}
    `;

    return {
        recoveryLib,
        typeHashDefinitions,
        params,
        mayNeed
    };
}