import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';
import * as util from "util";
import { OUTPUT_PATH } from '../../config';

const execPromise = util.promisify(exec);

interface ISaveConfig {
    dirPath: string,
    content: string,
    name: string
}

export function save({ dirPath, content, name }: ISaveConfig): string {

    const filePath = path.join(dirPath, `${name}.sol`);

    if (!fs.existsSync(dirPath)){
        fs.mkdirSync(dirPath);
    }

    fs.writeFileSync(filePath, content, 'utf8');

    return filePath;
}

export async function prettier() {
    const {stdout, stderr} = await execPromise("pnpm prettier");

    console.log(stdout, stderr);
}

export async function compile(targetFolder: string) {
    const {stdout, stderr} = await execPromise(`cross-env ${OUTPUT_PATH}=${targetFolder} pnpm compile`);

    console.log(stdout, stderr);
}