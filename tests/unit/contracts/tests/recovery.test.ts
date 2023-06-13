import { expect } from "chai";
import { IContractsOutput, IDefinition } from "../../../../src/codegen/types";
import { ContractDefinition, FunctionDefinition, ParseResult, loadDefinitions } from "../utils";
import { build } from "../../../../src/codegen/contracts";
import { parse, visit } from '@solidity-parser/parser';

describe('Recovery Function', () => {

  let definitions: IDefinition[];
  let contracts: IContractsOutput[];
  let recoveryContracts: string[];
  let recoveryContractsAST: ParseResult[];
  let recoveryFunctionsAST: FunctionDefinition[];

  before(async () => {
    definitions = await loadDefinitions();

    contracts = definitions.map(def => build(def, def.struct.map(el=>el.name).join('_')));

    recoveryContracts = contracts.map(set => set.recoveryLib);

    recoveryContractsAST = recoveryContracts.map(src => parse(src, { tolerant: true, loc: true }));

    recoveryFunctionsAST = recoveryContractsAST.flatMap(ast => {
      let func: FunctionDefinition[] = [];

      (ast.children
        .filter(node => (node as ContractDefinition).kind == "contract")
        [0] as ContractDefinition)
        .subNodes
        .filter(node => node.type == 'FunctionDefinition')
        .map(node => {
          if((node as FunctionDefinition).name?.includes("recover")) {
            func.push((node as FunctionDefinition));
          }
        });

      return func!;
    });

    expect(recoveryFunctionsAST.length).to.eql(definitions.map(def => def.struct.length).reduce((acc, el) => acc + el, 0));
  })
  
  it("Static syntax validity check", () => {

    recoveryContractsAST.map(ast => {
      expect(ast.errors).to.be.undefined;
    })
  })

  it("Output type check", () => {
    
  })
});