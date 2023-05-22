import { OptionValues } from 'commander';
import * as path from 'path';

import { generateContractArtifacts } from './generate-contract-artifacts.option';
import { generateScriptArtifacts } from './generate-script-artifacts.option';
import { IDefinition } from '../codegen/types';
import { isUndefined } from 'util';

const cwd: string = path.resolve();
let definitionSourcePath: string = cwd;

export default async function (opts: OptionValues) {

    definitionSourcePath = opts.file || path.join(cwd, 'definition.ts');

    const definition: IDefinition = await import(definitionSourcePath);

    if(opts.contract) {
        generateContractArtifacts(definition);
    }

    if(opts.script) {
        generateScriptArtifacts(definition);
    }
}