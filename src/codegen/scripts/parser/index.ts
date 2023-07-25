import { parseEvmType } from "./parseEvmTypes";
import { generateOutputType, generateInputType } from "./types";

export const inferType = (solidityType: string): string => 
    generateInputType({
        returnResultObject: false,
        useStructs: true
    },
    parseEvmType(solidityType));