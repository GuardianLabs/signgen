import { build } from "../codegen/contracts";
import { IDefinition } from "../codegen/types";

export async function generateContractArtifacts(def: IDefinition, targetFolder: string) {
    const raw = build(def);
    console.log(raw);

    // prettify
    // write to file
}