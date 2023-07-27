import { IDefinition } from "../../types";
import {
  buildEnumStubs,
  buildRelatedStruct,
  buildSignedStruct,
  buildStruct,
  buildStructStubs,
} from "../constructions/nonterminals";
import { SOLIDITY_19, UNLICENSED_LICENSE } from "../constructions/terminals";

export const composeParams = (def: IDefinition) => {
  return `
    
    ${UNLICENSED_LICENSE}
    ${SOLIDITY_19}

    ${buildEnumStubs(def)}
    
    ${buildStruct(def)}

    ${buildSignedStruct(def)}

    ${buildRelatedStruct(def)}

    ${buildStructStubs(def)}
    `;
};
