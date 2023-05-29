import { IDefinition, IScriptsOutput } from "../codegen/types";
import { prettifyTypescript, save, transpile } from "./utils";
import * as path from 'path';
import { build } from "../codegen/scripts";
import { Extension, TYPES_FILENAME } from "./config";

export async function generateScriptArtifacts(def: IDefinition, outputFolder: string, version: string): Promise<void> {
    const nameSnake = def.struct.map(el=>el.name).join('_');
    const nameCamel = def.struct.map(el=>el.name).join('');

    const output: IScriptsOutput = build(def, nameSnake);

    const targetFolder = path.join(path.join(outputFolder, "tests"), version);

    save({
        dirPath: targetFolder,
        content: output.tests,
        name: `${nameCamel}_recovery.spec`,
        ext: Extension.Typescript
    })

    save({
        dirPath: targetFolder,
        content: output.types,
        name: TYPES_FILENAME,
        ext: Extension.Typescript
    })

    save({
        dirPath: targetFolder,
        content: output.utils,
        name: `${nameCamel}.utils`,
        ext: Extension.Typescript
    })

    const relativeFolder = `./${path.relative(path.resolve(), targetFolder)}`;

    await prettifyTypescript(relativeFolder);

    //await transpile(relativeFolder);
}