import { OptionValues } from 'commander';
import * as path from 'path';
import * as shortid from 'shortid';
import { generateContractArtifacts } from './generate-contract-artifacts.option';
import { generateScriptArtifacts } from './generate-script-artifacts.option';
import { IDefinition } from '../codegen/types';

const cwd: string = path.resolve();

let definitionSourcePath: string;
let destinationFolder: string;

let testPath: string;

export default async function (opts: OptionValues) {

    definitionSourcePath = opts.file ? path.join(cwd, opts.file) : path.join(cwd, 'definition.ts');
    destinationFolder = opts.dist || path.join(cwd, 'output');

    const definition: IDefinition = (await import(definitionSourcePath)).default;

    const version = shortid.generate()
    .replace('-', '')
    .replace('_', '');

    if(opts.contract) {
        await generateContractArtifacts(definition, path.join(destinationFolder, "contracts"), version);
    }

    if(opts.script) {
        await generateScriptArtifacts(definition, path.join(destinationFolder, "tests"), version);
    }

    // if (-c && -s) console.log("start tests");
}