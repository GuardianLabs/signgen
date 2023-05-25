import { IDefinition } from "../codegen/types";
import { prettifyTypescript, transpile } from "./utils";
import * as path from 'path';

export async function generateScriptArtifacts(def: IDefinition, targetFolder: string, version: string): Promise<void> {
    const nameSnake = def.struct.map(el=>el.name).join('_');
    const nameCamel = def.struct.map(el=>el.name).join('');
    
    const relativeFolder = `./${path.relative(path.resolve(), targetFolder)}`;

    await prettifyTypescript(relativeFolder);

    await transpile(relativeFolder);
}