import { build } from "../codegen/contracts";
import { IContractsOutput, IDefinition } from "../codegen/types";
import { compile, prettifySolidity, save } from "./utils";
import * as path from 'path';
import { Extension, MAY_NEED_FILENAME, RECOVERY_LIB_FILENAME, STRUCTS_FILENAME, TYPEHASH_DEFINITIONS_FILENAME } from "./config";

export async function generateContractArtifacts(def: IDefinition, targetFolder: string, version: string): Promise<void> {
    
    const nameSnake = def.struct.map(el=>el.name).join('_');
    const nameCamel = def.struct.map(el=>el.name).join('');

    const output: IContractsOutput = build(def, nameSnake);

    targetFolder = path.join(targetFolder, version);

    save({
        dirPath: targetFolder,
        content: output.recoveryLib,
        name: `${RECOVERY_LIB_FILENAME}_${nameCamel}`,
        ext: Extension.Solidity
    })

    save({
        dirPath: targetFolder,
        content: output.typeHashDefinitions,
        name: TYPEHASH_DEFINITIONS_FILENAME,
        ext: Extension.Solidity
    })

    save({
        dirPath: targetFolder,
        content: output.params,
        name: STRUCTS_FILENAME,
        ext: Extension.Solidity
    })

    save({
        dirPath: targetFolder,
        content: output.mayNeed,
        name: MAY_NEED_FILENAME,
        ext: Extension.Solidity
    })

    const relativeFolder = `./${path.relative(path.resolve(), targetFolder)}`;

    await prettifySolidity(relativeFolder);

    await compile(relativeFolder);
}