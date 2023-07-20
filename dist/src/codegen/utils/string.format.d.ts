import { IProperty } from "../types";
export declare const formatCapitalSnake: (str: string) => string;
export declare const formatSolidityParameters: (props: IProperty[]) => string;
export declare const optionalComma: (props: IProperty[]) => string;
export declare const optionalString: (props: IProperty[], delegate: any) => string;
