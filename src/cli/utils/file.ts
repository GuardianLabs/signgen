import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';
import * as util from "util";
import { OUTPUT_CONTRACTS_PATH, OUTPUT_TESTS_PATH} from '../../config';
import { Extension } from '../config';

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
    const {stdout, stderr} = await execPromise(`prettier --write ${targetFolder}/**/*.sol --plugin-search-dir=.`);

    console.log(stdout, stderr);
}

export async function prettifyTypescript(targetFolder: string) {
    const {stdout, stderr} = await execPromise(`prettier --write ${targetFolder}/**/*.ts --plugin-search-dir=.`);

    console.log(stdout, stderr);
}

export async function compile(targetFolder: string, version: string) {
    const {stdout, stderr} = await execPromise(`cross-env ${OUTPUT_CONTRACTS_PATH}=${path.join(targetFolder, path.join("contracts", version))} ${OUTPUT_TESTS_PATH}=${path.join(targetFolder, path.join("tests", version))} pnpm compile`);

    console.log(stdout, stderr);
}

export async function transpile(targetFolder: string) {
    const {stdout, stderr} = await execPromise(`tsc ${targetFolder}/**/*.ts`);

    console.log(stdout, stderr);
}

export async function test(targetFolder: string, version: string) {
    const {stdout, stderr} = await execPromise(`cross-env ${OUTPUT_CONTRACTS_PATH}=${path.join(targetFolder, path.join("contracts", version))} ${OUTPUT_TESTS_PATH}=${path.join(targetFolder, path.join("tests", version))}  pnpm test`);

    console.log(stdout, stderr);
}