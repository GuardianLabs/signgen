import { build } from "../codegen/contracts";
import { IDefinition } from "../codegen/types";
import { prettier, save } from "./utils";

export async function generateContractArtifacts(def: IDefinition, targetFolder: string): Promise<string> {
    const raw = build(def);

    const path = save({
        dirPath: targetFolder,
        content: raw,
        prefix: def.struct.map(el=>el.name).join('_')
    })

    await prettier();

    return path;
}