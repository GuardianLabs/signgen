import { IDefinition, IProperty } from "../types";
export declare const getDefaultStub: (type: string, def: IDefinition, prop: IProperty) => any;
export declare const pasteDefaultStub: (type: string, def: IDefinition, prop: IProperty) => any;
export declare const stubUndefinedStruct: () => IProperty[];
export declare const stubUndefinedEnum: () => string[];
