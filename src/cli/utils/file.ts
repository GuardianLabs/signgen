import { exec } from "child_process";
import * as fs from "fs";
import hre from "hardhat";
import * as path from "path";
import prettier from "prettier";
import * as util from "util";
import { Extension } from "../config";
import "./types";

const execPromise = util.promisify(exec);

interface ISaveConfig {
  dirPath: string;
  content: string;
  name: string;
  ext: Extension;
}

function setHardhatPaths(dir: string) {
  hre.setPaths(dir);
}

export function save({ dirPath, content, name, ext }: ISaveConfig): string {
  const filePath = path.join(dirPath, `${name}${ext}`);

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  fs.writeFileSync(filePath, content, "utf8");

  return filePath;
}

export function prettifySolidity(originalCode: string): string {
  return prettier.format(originalCode, {
    parser: "solidity-parse",
    pluginSearchDirs: ["."],
    plugins: ["prettier-plugin-solidity"],
  });
}

export function prettifyTypescript(originalCode: string): string {
  return prettier.format(originalCode, {
    parser: "babel",
  });
}

export async function compile(targetFolder: string) {
  setHardhatPaths(targetFolder);

  await hre.run("compile", {
    // noTypechain: true
  });
}

export async function transpile(targetFolder: string) {
  const { stdout, stderr } = await execPromise(
    `npx tsc ${targetFolder}/**/*.ts`
  );

  console.log(stdout, stderr);
}

export async function test(targetFolder: string, testFiles: string[]) {
  setHardhatPaths(targetFolder);

  //console.log({path: hre.config.paths, env: hre})

  await hre.run("test", {
    noCompile: true,
    testFiles: testFiles.map((testFile) =>
      path.join(path.join(targetFolder, "tests"), testFile)
    ),
  });
}
