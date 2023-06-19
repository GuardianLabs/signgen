import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';
import * as util from "util";
import { OUTPUT_ARTIFACTS_PATH, OUTPUT_CACHE_PATH, OUTPUT_CONTRACTS_PATH, OUTPUT_TESTS_PATH, OUTPUT_TYPECHAIN_PATH} from '../../config';
import { Extension } from '../config';
import prettier from 'prettier';

const execPromise = util.promisify(exec);

interface ISaveConfig {
    dirPath: string,
    content: string,
    name: string,
    ext: Extension
}

export function save({ dirPath, content, name, ext }: ISaveConfig): string {

    const filePath = path.join(dirPath, `${name}${ext}`);

    if (!fs.existsSync(dirPath)){
        fs.mkdirSync(dirPath, { recursive: true });
    }

    fs.writeFileSync(filePath, content, 'utf8');

    return filePath;
}

export async function prettifySolidity(targetFolder: string) {
    const {stdout, stderr} = await execPromise(`pnpm prettier ${targetFolder}/**/*.sol`); // `npx prettier --write ${targetFolder}/**/*.sol --plugin-search-dir=.`

    console.log(stdout, stderr);
}

export async function prettifyTypescript(targetFolder: string) {
    const {stdout, stderr} = await execPromise(`pnpm prettier ${targetFolder}/**/*.ts`);

    console.log(stdout, stderr);
}

export async function compile(targetFolder: string) {
    const {stdout, stderr} = await execPromise(`pnpm crossenv ${OUTPUT_CONTRACTS_PATH}=${path.join(targetFolder, "contracts")} ${OUTPUT_TESTS_PATH}=${path.join(targetFolder, "tests")} ${OUTPUT_CACHE_PATH}=${path.join(targetFolder, "cache")} ${OUTPUT_ARTIFACTS_PATH}=${path.join(targetFolder, "artifacts")} ${OUTPUT_TYPECHAIN_PATH}=${path.join(targetFolder, "typechain")} pnpm compile`);

    console.log(stdout, stderr);
}

export async function transpile(targetFolder: string) {
    const {stdout, stderr} = await execPromise(`npx tsc ${targetFolder}/**/*.ts`);

    console.log(stdout, stderr);
}

export async function testWithTrace(targetFolder: string) {
    const {stdout, stderr} = await execPromise(`pnpm crossenv ${OUTPUT_CONTRACTS_PATH}=${path.join(targetFolder, "contracts")} ${OUTPUT_TESTS_PATH}=${path.join(targetFolder, "tests")} ${OUTPUT_CACHE_PATH}=${path.join(targetFolder, "cache")} ${OUTPUT_ARTIFACTS_PATH}=${path.join(targetFolder, "artifacts")} ${OUTPUT_TYPECHAIN_PATH}=${path.join(targetFolder, "typechain")} pnpm test:trace`);

    console.log(stdout, stderr);
}

export async function test(targetFolder: string) {
    const {stdout, stderr} = await execPromise(`pnpm crossenv ${OUTPUT_CONTRACTS_PATH}=${path.join(targetFolder, "contracts")} ${OUTPUT_TESTS_PATH}=${path.join(targetFolder, "tests")} ${OUTPUT_CACHE_PATH}=${path.join(targetFolder, "cache")} ${OUTPUT_ARTIFACTS_PATH}=${path.join(targetFolder, "artifacts")} ${OUTPUT_TYPECHAIN_PATH}=${path.join(targetFolder, "typechain")} pnpm test`);

    console.log(stdout, stderr);
}