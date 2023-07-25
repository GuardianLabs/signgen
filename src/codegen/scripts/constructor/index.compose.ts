import { IDefinition } from "../../types";
import {
    buildIndex,
} from "../constructions/nonterminals";

export const composeIndex = (def: IDefinition) => {

    return `
    ${buildIndex(def)}
    `;
}