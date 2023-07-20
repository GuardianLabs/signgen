import { IDefinition } from "../../types";
import {
    buildTestSuite,
} from "../constructions/nonterminals";

export const composeTests = (def: IDefinition) => {

    return `
    ${buildTestSuite(def)}
    `;
}