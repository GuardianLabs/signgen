import { expect } from "chai";
import { IContractsOutput, IDefinition } from "../../../../src/codegen/types";
import { ContractDefinition, FunctionDefinition, ParseResult, loadDefinitions, selectFunctions } from "../utils";
import { build } from "../../../../src/codegen/contracts";
import { parse, visit } from '@solidity-parser/parser';

const messageCount = (defs: IDefinition[]) => defs.map(def => def.struct.length).reduce((acc, el) => acc + el, 0);

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

    recoveryFunctionsAST = recoveryContractsAST.flatMap(ast => selectFunctions(ast, 'recover'));

    expect(recoveryFunctionsAST.length).to.eql(messageCount(definitions));
  })
  
  it("Static syntax validity check", () => {

    recoveryContractsAST.map(ast => {
      expect(ast.errors).to.be.undefined;
    })
  })

  it("Output type check", () => {
    
  })
});