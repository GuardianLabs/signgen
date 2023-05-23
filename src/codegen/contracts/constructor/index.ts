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
    HASH_TYPED_DATA_V4 
} from "../constructions/terminals";

export function build(def: IDefinition): string {
    return `
    ${ECDSA_OZ}

    ${ERC1271}

    ${HASH_TYPED_DATA_V4}
    ${HASH_AND_RECOVER}

    ${buildTypeHash(def)}

    ${buildStruct(def)}

    ${buildSignedStruct(def)}

    ${buildRecoverFunctions(def)}

    ${buildVerifyFunctions(def)}
    `;
}