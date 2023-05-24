import { build } from "../codegen/contracts";
import { IDefinition } from "../codegen/types";
import { compile, prettier, save } from "./utils";
import * as shortid from 'shortid';
import * as path from 'path';

export async function generateContractArtifacts(def: IDefinition, targetFolder: string): Promise<string> {
    const version = shortid.generate()
        .replace('-', '')
        .replace('_', '');

    const raw = build(def, version);

    const filePath = save({
        dirPath: targetFolder,
        content: raw,
        name: `${def.struct.map(el=>el.name).join('_')}_${version}`
    })

    await prettier();

    await compile(`./${path.relative(path.resolve(), targetFolder)}`);

    return filePath;
}