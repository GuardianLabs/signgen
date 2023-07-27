import { OptionValues } from "commander";
import * as path from "path";
import * as shortid from "shortid";
import { IDefinition } from "../codegen/types";
import { TESTS_FILENAME } from "./config";
import { generateContractArtifacts } from "./generate-contract-artifacts.option";
import { generateScriptArtifacts } from "./generate-script-artifacts.option";
import { test, validateDefinition } from "./utils";

const cwd: string = path.resolve();

let definitionSourcePath: string;
let destinationFolder: string;

export default async function (opts: OptionValues) {
  definitionSourcePath = opts.file
    ? path.join(cwd, opts.file)
    : path.join(cwd, "definition.js");
  destinationFolder = opts.dist || path.join(cwd, "output");

  const definition: IDefinition = (await import(definitionSourcePath)).default;

  let verifyingContract = definition.domain.verifyingContract;
  if (verifyingContract)
    definition.domain.verifyingContract = `"${verifyingContract}"`;

  let salt = definition.domain.salt;
  if (salt) definition.domain.salt = `"${salt}"`;

  validateDefinition(definition);

  const version = shortid.generate().replace("-", "").replace("_", "");

  console.info(`Version: ${version}`);

  destinationFolder = path.join(destinationFolder, version);

  if (opts.contract) {
    await generateContractArtifacts(definition, destinationFolder);
  }

  if (opts.script) {
    await generateScriptArtifacts(definition, destinationFolder);
  }

  if (opts.launch && opts.contract && opts.script) {
    const nameCamel = definition.struct.map((el) => el.name).join("");
    const testFile = `${TESTS_FILENAME}.ts`; // `${nameCamel}_recovery.spec.ts`;

    await test(destinationFolder, [testFile]);
  }
}
