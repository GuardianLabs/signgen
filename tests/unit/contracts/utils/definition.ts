import { IDefinition } from "../../../../src/codegen/types";
import * as path from 'path';
import * as fs from "fs";

export const loadDefinitions = async (): Promise<IDefinition[]> => {
    const definitions: IDefinition[] = [];

    const cwd: string = path.resolve();
    const testsFolder = './tests/unit/definitions';

    const files = await fs.promises.readdir(testsFolder);

    files.forEach(async (file) => {
        
        const definitionSourcePath = path.join(path.join(cwd, testsFolder), file);

        const definition: IDefinition = (await import(definitionSourcePath)).default;
        
        let verifyingContract = definition.domain.verifyingContract;
        if(verifyingContract) definition.domain.verifyingContract = `"${verifyingContract}"`;

        let salt = definition.domain.salt;
        if(salt) definition.domain.salt = `"${salt}"`;

        definitions.push(definition);
    });

    return await definitions;
}

export const messageCount = (defs: IDefinition[]) => defs.map(def => def.struct.length).reduce((acc, el) => acc + el, 0);