import { expect } from "chai";
import { IContractsOutput, IDefinition } from "../../../../../src/codegen/types";
import { ElementaryTypeName, FunctionDefinition, ParseResult, loadDefinitions, messageCount, selectFunctions } from "../../utils";
import { build } from "../../../../../src/codegen/contracts";
import { parse, visit } from '@solidity-parser/parser';

describe('Recovery Function', () => {

  let definitions: IDefinition[];
  let contracts: IContractsOutput[];
  let sigContracts: string[];
  let sigContractsAST: ParseResult[];
  let recoveryFunctionsAST: FunctionDefinition[];

  before(async () => {
    definitions = await loadDefinitions();

    contracts = definitions.map(def => build(def, def.struct.map(el=>el.name).join('_')));

    sigContracts = contracts.map(set => set.recoveryLib);

    sigContractsAST = sigContracts.map(src => parse(src, { tolerant: true, loc: true }));

    recoveryFunctionsAST = sigContractsAST.flatMap(ast => selectFunctions(ast, 'recover'));
  })

  it("All defined messages should have corresponding recovery functions", () => {

    expect(recoveryFunctionsAST.length).to.eql(messageCount(definitions));
  })

  it("Output type should be address", () => {
    recoveryFunctionsAST.map(ast => {

      expect(ast.returnParameters?.length).to.eql(1);
      expect((ast.returnParameters![0].typeName as ElementaryTypeName).name).to.eq("address");
    })
  })
});