import { parse } from "@solidity-parser/parser";
import { expect } from "chai";
import { build } from "../../../../../src/codegen/contracts";
import {
  IContractsOutput,
  IDefinition,
} from "../../../../../src/codegen/types";
import {
  FunctionDefinition,
  ParseResult,
  loadDefinitions,
  messageCount,
  selectFunctions,
} from "../../utils";

describe("Verify Function", () => {
  let definitions: IDefinition[];
  let contracts: IContractsOutput[];
  let sigContracts: string[];
  let sigContractsAST: ParseResult[];
  let verifyFunctionsAST: FunctionDefinition[];

  before(async () => {
    definitions = await loadDefinitions();

    contracts = definitions.map((def) =>
      build(def, def.struct.map((el) => el.name).join("_")),
    );

    sigContracts = contracts.map((set) => set.recoveryLib);

    sigContractsAST = sigContracts.map((src) =>
      parse(src, { tolerant: true, loc: true }),
    );

    verifyFunctionsAST = sigContractsAST.flatMap((ast) =>
      selectFunctions(ast, "verify"),
    );
  });

  it("All defined messages should have corresponding verify functions", () => {
    expect(verifyFunctionsAST.length).to.eql(messageCount(definitions));
  });

  it("Output type should be void", () => {
    verifyFunctionsAST.map((ast) => {
      expect(ast.returnParameters).to.be.null;
    });
  });
});
