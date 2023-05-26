import { IDefinition, IScriptsOutput } from "../../types";
import { composeTests } from "./tests.compose";
import { composeTypes } from "./types.compose";
import { composeUtils } from "./utils.compose";

export function build(def: IDefinition, name: string): IScriptsOutput {
    
    return {
        tests: composeTests(def),
        types: composeTypes(def),
        utils: composeUtils(def)
    };
}