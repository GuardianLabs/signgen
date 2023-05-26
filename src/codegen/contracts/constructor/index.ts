import { IContractsOutput, IDefinition } from "../../types";
import { composeLib } from "./lib.compose";
import { composeParams } from "./params.compose";
import { composeTypehash } from "./typehash.compose";
import { composeUtils } from "./utils.compose";

export function build(def: IDefinition, name: string): IContractsOutput {

    return {
        recoveryLib: composeLib(def, name),
        typeHashDefinitions: composeTypehash(def),
        params: composeParams(def),
        mayNeed: composeUtils(def)
    };
}