import { IDefinition, IProperty } from "../../../../types";
export declare const composeConstantStubs: (def: IDefinition) => (props: IProperty[]) => string;
export declare const composeArgument: (props: IProperty[]) => string;
export declare const composeObjectField: (def: IDefinition) => (prop: IProperty) => string;
export declare const composeObjectFields: (def: IDefinition, props: IProperty[]) => string;
