import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';
import * as util from "util";
import { OUTPUT_PATH } from '../../config';
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

export async function compile(targetFolder: string) {
    const {stdout, stderr} = await execPromise(`cross-env ${OUTPUT_PATH}=${targetFolder} pnpm compile`);

    console.log(stdout, stderr);
}

export async function transpile(targetFolder: string) {
    const {stdout, stderr} = await execPromise(`tsc ${targetFolder}/**/*.ts`);

    console.log(stdout, stderr);
}

export async function test(targetFolder: string) {
    const {stdout, stderr} = await execPromise(`cross-env ${OUTPUT_PATH}=${targetFolder} pnpm test`);

    console.log(stdout, stderr);
}