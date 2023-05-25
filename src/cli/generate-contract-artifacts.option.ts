import { build } from "../codegen/contracts";
import { IContractsOutput, IContractsSignature, IDefinition } from "../codegen/types";
import { compile, prettier, save } from "./utils";
import * as shortid from 'shortid';
import * as path from 'path';
import { MAY_NEED_FILENAME, RECOVERY_LIB_FILENAME, STRUCTS_FILENAME, TYPEHASH_DEFINITIONS_FILENAME } from "./config";

export async function generateContractArtifacts(def: IDefinition, targetFolder: string): Promise<IContractsSignature> {
    const version = shortid.generate()
        .replace('-', '')
        .replace('_', '');
    
    const nameSnake = def.struct.map(el=>el.name).join('_');
    const nameCamel = def.struct.map(el=>el.name).join('');

    const output: IContractsOutput = build(def, nameSnake);

    targetFolder = path.join(targetFolder, version);

    save({
        dirPath: targetFolder,
        content: output.recoveryLib,
        name: `${RECOVERY_LIB_FILENAME}_${nameCamel}`
    })

    save({
        dirPath: targetFolder,
        content: output.typeHashDefinitions,
        name: TYPEHASH_DEFINITIONS_FILENAME
    })

    save({
        dirPath: targetFolder,
        content: output.params,
        name: STRUCTS_FILENAME
    })

    save({
        dirPath: targetFolder,
        content: output.mayNeed,
        name: MAY_NEED_FILENAME
    })

    const relativeFolder = `./${path.relative(path.resolve(), targetFolder)}`;

    await prettier(relativeFolder);

    await compile(relativeFolder);

    return {
        version,
        name: nameCamel
    };
}