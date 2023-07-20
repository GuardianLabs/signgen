import { IDefinition } from "../../types";
import { ERC1271, SOLIDITY_19, UNLICENSED_LICENSE } from "../constructions/terminals";

export const composeUtils = (def: IDefinition) => {
    
    return `

    ${UNLICENSED_LICENSE}
    ${SOLIDITY_19}
    
    ${ERC1271}

    `;
}