import { ContractDefinition, FunctionDefinition, ParseResult } from "./types";

export const selectFunctions = (
  ast: ParseResult,
  selector: string
): FunctionDefinition[] => {
  let func: FunctionDefinition[] = [];

  (
    ast.children.filter(
      (node) => (node as ContractDefinition).kind == "contract"
    )[0] as ContractDefinition
  ).subNodes
    .filter((node) => node.type == "FunctionDefinition")
    .map((node) => {
      const regexp = new RegExp(selector);

      if (regexp.test((node as FunctionDefinition).name!)) {
        func.push(node as FunctionDefinition);
      }
    });

  return func!;
};
