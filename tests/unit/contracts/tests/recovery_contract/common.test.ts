import { expect } from "chai";
import { IContractsOutput, IDefinition } from "../../../../../src/codegen/types";
import { ParseResult, loadDefinitions } from "../../utils";
import { build } from "../../../../../src/codegen/contracts";
import { parse, visit } from '@solidity-parser/parser';

describe('Signature Verification Contract General Smoke Tests', () => {

  let definitions: IDefinition[];
  let contracts: IContractsOutput[];
  let sigContracts: string[];
  let sigContractsAST: ParseResult[];

  before(async () => {
    definitions = await loadDefinitions();

    contracts = definitions.map(def => build(def, def.struct.map(el=>el.name).join('_')));

    sigContracts = contracts.map(set => set.recoveryLib);

    sigContractsAST = sigContracts.map(src => parse(src, { tolerant: true, loc: true }));
  })
  
  it("Static syntax validity check", () => {

    sigContractsAST.map(ast => {

      expect(ast.errors).to.be.undefined;
    })
  })
});