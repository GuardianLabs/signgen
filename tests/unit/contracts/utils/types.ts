import { SourceUnit } from '@solidity-parser/parser/dist/src/ast-types';
import { Token } from '@solidity-parser/parser/dist/src/types';
export { FunctionDefinition, ContractDefinition, ElementaryTypeName } from '@solidity-parser/parser/dist/src/ast-types.d';

export declare type ParseResult = SourceUnit & {
    errors?: any[];
    tokens?: Token[];
};