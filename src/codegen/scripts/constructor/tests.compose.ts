import { IDefinition } from "../../types";
import {
    buildBeforeStatement, 
    buildRecoverTestCase,
    buildTestSuite,
    buildVerifyTestCase
} from "../constructions/nonterminals";

export const composeTests = (def: IDefinition) => {

    return `
    describe('Signatures tests', () => {

    ${buildBeforeStatement(def)}
    ${buildTestSuite(def)}
    });
    `;
}