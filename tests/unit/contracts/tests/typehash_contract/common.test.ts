import { parse } from "@solidity-parser/parser";
import { expect } from "chai";
import { build } from "../../../../../src/codegen/contracts";
import {
  IContractsOutput,
  IDefinition,
} from "../../../../../src/codegen/types";
import { ParseResult, loadDefinitions } from "../../utils";

describe("Typehash Contract General Smoke Tests", () => {
  let definitions: IDefinition[];
  let contracts: IContractsOutput[];
  let typehashContracts: string[];
  let typehashContractsAST: ParseResult[];

  before(async () => {
    definitions = await loadDefinitions();

    contracts = definitions.map((def) =>
      build(def, def.struct.map((el) => el.name).join("_")),
    );

    typehashContracts = contracts.map((set) => set.typeHashDefinitions);

    typehashContractsAST = typehashContracts.map((src) =>
      parse(src, { tolerant: true, loc: true }),
    );
  });

  it("Static syntax validity check", () => {
    typehashContractsAST.map((ast) => {
      expect(ast.errors).to.be.undefined;
    });
  });
});
