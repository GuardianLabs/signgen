import { IDefinition, IScriptsOutput } from "../codegen/types";
import { prettifyTypescript, save, transpile } from "./utils";
import * as path from 'path';
import { build } from "../codegen/scripts";
import { Extension, TYPES_FILENAME } from "./config";

export async function generateScriptArtifacts(def: IDefinition, outputFolder: string): Promise<void> {
    const nameSnake = def.struct.map(el=>el.name).join('_');
    const nameCamel = def.struct.map(el=>el.name).join('');

    const output: IScriptsOutput = build(def, nameSnake);

    const targetFolder = path.join(outputFolder, "tests");

    save({
        dirPath: targetFolder,
        content: prettifyTypescript(output.tests),
        name: `${nameCamel}_recovery.spec`,
        ext: Extension.Typescript
    })

    save({
        dirPath: targetFolder,
        content: prettifyTypescript(output.types),
        name: TYPES_FILENAME,
        ext: Extension.Typescript
    })

    save({
        dirPath: targetFolder,
        content: prettifyTypescript(output.utils),
        name: `${nameCamel}.utils`,
        ext: Extension.Typescript
    })

    //await transpile(relativeFolder);
}