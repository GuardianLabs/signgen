import { IDefinition } from "../../codegen/types";
type ValidationResult = [isValid: boolean, error: string];
export declare const isValidDefinition: (def: IDefinition) => ValidationResult;
export declare const validateDefinition: (def: IDefinition) => void;
export {};
