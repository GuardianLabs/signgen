import { IDefinition } from "../../types";
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

export function build(def: IDefinition, version: string): string {
    return `
    ${UNLICENSED_LICENSE}
    ${SOLIDITY_19}
    
    ${ECDSA_OZ}

    ${ERC1271}

    contract ${def.struct.map(el=>el.name).join('_')}_${version} {

        ${HASH_TYPED_DATA_V4}
        ${HASH_AND_RECOVER}

        ${buildTypeHash(def)}

        ${buildStruct(def)}

        ${buildSignedStruct(def)}

        ${buildRecoverFunctions(def)}

        ${buildVerifyFunctions(def)}
    }
    `;
}