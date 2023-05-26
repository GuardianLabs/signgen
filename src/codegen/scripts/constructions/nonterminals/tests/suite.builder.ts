import { IDefinition } from "../../../../types";
import { buildRecoverTestCase, buildVerifyTestCase } from "./case.bulder";

export const buildTestSuite = (def: IDefinition) => {

    return `
    describe('${def.struct.map(el => el.name).join(', ')} signatures', () => {
        beforeEach(() => {
          
        });

        ${buildRecoverTestCase(def)}
        ${buildVerifyTestCase(def)}
    }`;
}