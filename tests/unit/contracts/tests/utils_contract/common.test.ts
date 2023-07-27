import { parse } from "@solidity-parser/parser";
import { expect } from "chai";
import { build } from "../../../../../src/codegen/contracts";
import {
  IContractsOutput,
  IDefinition,
} from "../../../../../src/codegen/types";
import { ParseResult, loadDefinitions } from "../../utils";

describe("Utils Contract General Smoke Tests", () => {
  let definitions: IDefinition[];
  let contracts: IContractsOutput[];
  let utilsContracts: string[];
  let utilsContractsAST: ParseResult[];

  before(async () => {
    definitions = await loadDefinitions();

    contracts = definitions.map((def) =>
      build(def, def.struct.map((el) => el.name).join("_"))
    );

    utilsContracts = contracts.map((set) => set.params);

    utilsContractsAST = utilsContracts.map((src) =>
      parse(src, { tolerant: true, loc: true })
    );
  });

  it("Static syntax validity check", () => {
    utilsContractsAST.map((ast) => {
      expect(ast.errors).to.be.undefined;
    });
  });
});
