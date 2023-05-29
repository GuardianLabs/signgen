import { IDefinition } from "../../types";
import {
    buildRecoverTestCase,
    buildTestSuite,
    buildVerifyTestCase
} from "../constructions/nonterminals";

export const composeTests = (def: IDefinition) => {

    return `

    ${buildTestSuite(def)}
    `;
}