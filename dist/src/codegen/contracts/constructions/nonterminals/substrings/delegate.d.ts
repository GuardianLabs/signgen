import { IDefinition, IProperty } from "../../../../types";
export declare const composeArgument: (props: IProperty[]) => string;
export declare const composeEncodeArgument: (def: IDefinition) => (props: IProperty[]) => string;
export declare const composeParameters: (props: IProperty[]) => string;
export declare const composeCustomEncodeArgument: (props: IProperty[]) => string;
export declare const composeStructField: (prop: IProperty) => string;
export declare const composeStructFields: (props: IProperty[]) => string;
