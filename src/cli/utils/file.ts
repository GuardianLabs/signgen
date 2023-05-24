import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';
import * as util from "util";

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

export async function compile() {
    const {stdout, stderr} = await execPromise("pnpm compile");

    console.log(stdout, stderr);
}

export async function setEnv(key: string, value: string) {
    const {stdout, stderr} = await execPromise(`pnpm cross-env ${key}=${value}`);

    console.log(stdout, stderr);
}