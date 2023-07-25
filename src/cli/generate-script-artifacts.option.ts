import { IDefinition, IScriptsOutput } from "../codegen/types";
import { prettifyTypescript, save, transpile } from "./utils";
import * as path from 'path';
import { build } from "../codegen/scripts";
import { Extension, INDEX_FILENAME, SIGNATURE_UTILS_FILENAME, TYPES_FILENAME } from "./config";

export async function generateScriptArtifacts(def: IDefinition, outputFolder: string): Promise<void> {
    const nameSnake = def.struct.map(el=>el.name).join('_');
    const nameCamel = def.struct.map(el=>el.name).join('');

    const output: IScriptsOutput = build(def);

    const targetFolderTests = path.join(outputFolder, "tests");
    const targetFolderHelpers = path.join(outputFolder, "src");

    save({
        dirPath: targetFolderHelpers,
        content: prettifyTypescript(output.index),
        name: INDEX_FILENAME,
        ext: Extension.Typescript
    })

    save({
        dirPath: targetFolderTests,
        content: prettifyTypescript(output.tests),
        name: `${nameCamel}_recovery.spec`,
        ext: Extension.Typescript
    })

    save({
        dirPath: targetFolderHelpers,
        content: prettifyTypescript(output.types),
        name: TYPES_FILENAME,
        ext: Extension.Typescript
    })

    save({
        dirPath: targetFolderHelpers,
        content: prettifyTypescript(output.utils),
        name: SIGNATURE_UTILS_FILENAME,
        ext: Extension.Typescript
    })

    //await transpile(relativeFolder);
}