import { OptionValues } from 'commander';
import * as path from 'path';
import { generateContractArtifacts } from './generate-contract-artifacts.option';
import { generateScriptArtifacts } from './generate-script-artifacts.option';
import { IDefinition } from '../codegen/types';

const cwd: string = path.resolve();

let definitionSourcePath: string;
let destinationFolder: string;

let contractPath: string;
let testPath: string;

export default async function (opts: OptionValues) {

    definitionSourcePath = opts.file ? path.join(cwd, opts.file) : path.join(cwd, 'definition.ts');
    destinationFolder = opts.dist || path.join(cwd, 'output');

    const definition: IDefinition = (await import(definitionSourcePath)).default;

    if(opts.contract) {
        contractPath = await generateContractArtifacts(definition, destinationFolder);
    }

    if(opts.script) {
        await generateScriptArtifacts(definition, destinationFolder);
    }
}