import { expect } from "chai";
import { IContractsOutput, IDefinition } from "../../../../../src/codegen/types";
import { ParseResult, loadDefinitions } from "../../utils";
import { build } from "../../../../../src/codegen/contracts";
import { parse, visit } from '@solidity-parser/parser';

describe('Structs Contract General Smoke Tests', () => {

  let definitions: IDefinition[];
  let contracts: IContractsOutput[];
  let structContracts: string[];
  let structContractsAST: ParseResult[];

  before(async () => {
    definitions = await loadDefinitions();

    contracts = definitions.map(def => build(def, def.struct.map(el=>el.name).join('_')));

    structContracts = contracts.map(set => set.params);

    structContractsAST = structContracts.map(src => parse(src, { tolerant: true, loc: true }));
  })
  
  it("Static syntax validity check", () => {

    structContractsAST.map(ast => {

      expect(ast.errors).to.be.undefined;
    })
  })
});