import { SourceUnit } from "@solidity-parser/parser/dist/src/ast-types";
import { Token } from "@solidity-parser/parser/dist/src/types";
export {
  ContractDefinition,
  ElementaryTypeName,
  FunctionDefinition,
} from "@solidity-parser/parser/dist/src/ast-types.d";

export declare type ParseResult = SourceUnit & {
  errors?: any[];
  tokens?: Token[];
};
