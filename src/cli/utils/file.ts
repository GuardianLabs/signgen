import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';
import * as shortid from 'shortid';
import * as util from "util";

const execPromise = util.promisify(exec);

interface ISaveConfig {
    dirPath: string,
    content: string,
    prefix: string
}

export function save({ dirPath, content, prefix }: ISaveConfig): string {
    const fileName = `${prefix}_${shortid.generate()}`;
    const filePath = path.join(dirPath, `${fileName}.sol`);

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