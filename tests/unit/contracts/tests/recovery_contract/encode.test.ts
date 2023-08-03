import { parse } from "@solidity-parser/parser";
import { expect } from "chai";
import { build } from "../../../../../src/codegen/contracts";
import {
  IContractsOutput,
  IDefinition,
} from "../../../../../src/codegen/types";
import {
  ElementaryTypeName,
  FunctionDefinition,
  ParseResult,
  loadDefinitions,
  messageCount,
  selectFunctions,
} from "../../utils";

describe("Recovery Function", () => {
  let definitions: IDefinition[];
  let contracts: IContractsOutput[];
  let sigContracts: string[];
  let sigContractsAST: ParseResult[];
  let encodeParamsFunctionsAST: FunctionDefinition[];

  before(async () => {
    definitions = await loadDefinitions();

    contracts = definitions.map((def) =>
      build(def, def.struct.map((el) => el.name).join("_")),
    );

    sigContracts = contracts.map((set) => set.recoveryLib);

    sigContractsAST = sigContracts.map((src) =>
      parse(src, { tolerant: true, loc: true }),
    );

    encodeParamsFunctionsAST = sigContractsAST.flatMap((ast) =>
      selectFunctions(ast, "^encode.*Parameters$"),
    );
  });

  it("All defined messages should have corresponding encode functions", () => {
    expect(encodeParamsFunctionsAST.length).to.eql(messageCount(definitions));
  });

  it("Output type should be memory bytes", () => {
    encodeParamsFunctionsAST.map((ast) => {
      expect(ast.returnParameters?.length).to.eql(1);

      expect(
        (ast.returnParameters![0].typeName as ElementaryTypeName).name,
      ).to.eq("bytes");

      expect(ast.returnParameters![0].storageLocation).to.eq("memory");
    });
  });
});
