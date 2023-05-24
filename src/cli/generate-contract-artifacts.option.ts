import { build } from "../codegen/contracts";
import { IDefinition } from "../codegen/types";
import { OUTPUT_PATH } from "../config";
import { compile, prettier, save, setEnv } from "./utils";
import * as shortid from 'shortid';
import * as path from 'path';

export async function generateContractArtifacts(def: IDefinition, targetFolder: string): Promise<string> {
    const version = shortid.generate();
    version.replace('_', '');
    version.replace('-', '');

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