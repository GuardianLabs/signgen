import { IDefinition } from "../../types";
import { buildStruct, buildSignedStruct } from "../constructions/nonterminals";
import { UNLICENSED_LICENSE, SOLIDITY_19 } from "../constructions/terminals";

export const composeParams = (def: IDefinition) => {

    return `
    
    ${UNLICENSED_LICENSE}
    ${SOLIDITY_19}
    
    ${buildStruct(def)}

    ${buildSignedStruct(def)}
    `;
}