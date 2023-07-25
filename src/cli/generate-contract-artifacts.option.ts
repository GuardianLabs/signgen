import { build } from "../codegen/contracts";
import { IContractsOutput, IDefinition } from "../codegen/types";
import { compile, prettifySolidity, save } from "./utils";
import * as path from 'path';
import { Extension, MAY_NEED_FILENAME, RECOVERY_LIB_FILENAME, STRUCTS_FILENAME, TYPEHASH_DEFINITIONS_FILENAME, UTIL_LIB_FILENAME } from "./config";

export async function generateContractArtifacts(def: IDefinition, outputFolder: string): Promise<void> {
    
    const nameSnake = def.struct.map(el=>el.name).join('_');
    const nameCamel = def.struct.map(el=>el.name).join('');

    const output: IContractsOutput = build(def, nameSnake);

    const targetFolder = path.join(outputFolder, "contracts");

    save({
        dirPath: targetFolder,
        content: prettifySolidity(output.recoveryLib),
<<<<<<< HEAD
        name: `${RECOVERY_LIB_FILENAME}`, // _${nameSnake}
=======
        name: `${RECOVERY_LIB_FILENAME}_${nameCamel}`,
>>>>>>> master
        ext: Extension.Solidity
    })

    save({
        dirPath: targetFolder,
        content: prettifySolidity(output.typeHashDefinitions),
        name: TYPEHASH_DEFINITIONS_FILENAME,
        ext: Extension.Solidity
    })

    save({
        dirPath: targetFolder,
        content: prettifySolidity(output.params),
        name: STRUCTS_FILENAME,
        ext: Extension.Solidity
    })

    save({
        dirPath: targetFolder,
        content: prettifySolidity(output.mayNeed),
        name: MAY_NEED_FILENAME,
        ext: Extension.Solidity
    })

    save({
        dirPath: targetFolder,
        content: prettifySolidity(output.utilLib),
        name: UTIL_LIB_FILENAME,
        ext: Extension.Solidity
    })

    await compile(outputFolder);
}