import { AbiOutputParameter, AbiParameter, EvmOutputType, EvmType, TupleType } from './parseEvmTypes';
export declare const FACTORY_POSTFIX = "__factory";
export declare const STRUCT_INPUT_POSTFIX = "Struct";
export declare const STRUCT_OUTPUT_POSTFIX = "StructOutput";
interface GenerateTypeOptions {
    returnResultObject?: boolean;
    useStructs?: boolean;
}
export declare function generateInputTypes(input: Array<AbiParameter>, options: GenerateTypeOptions): string;
export declare function generateOutputTypes(options: GenerateTypeOptions, outputs: Array<AbiOutputParameter>): string;
export declare function generateInputType(options: GenerateTypeOptions, evmType: EvmType): string;
export declare function generateOutputType(options: GenerateTypeOptions, evmType: EvmOutputType): string;
export declare function generateObjectTypeLiteral(tuple: TupleType, generator: (evmType: EvmType) => string): string;
export declare function generateOutputComplexType(components: AbiOutputParameter[], options: GenerateTypeOptions): string;
export declare function generateOutputComplexTypeAsArray(components: AbiOutputParameter[], options: GenerateTypeOptions): string;
export declare function generateOutputComplexTypesAsObject(components: AbiOutputParameter[], options: GenerateTypeOptions): string | undefined;
export {};
