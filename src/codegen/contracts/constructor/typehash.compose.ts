import { IDefinition } from "../../types";
import { buildStubTypeHash, buildTypeHash } from "../constructions/nonterminals";
import { UNLICENSED_LICENSE, SOLIDITY_19 } from "../constructions/terminals";

export const composeTypehash = (def: IDefinition) => {

    return `
    
    ${UNLICENSED_LICENSE}
    ${SOLIDITY_19}

    ${buildTypeHash(def)}

    ${buildStubTypeHash(def)}
    `;
}