import * as fs from "fs";
import * as path from 'path';
import { exec } from 'child_process';
import * as util from "util";
import { cwd } from "process";

const testsFolder = './test/definitions';

const execPromise = util.promisify(exec);

export async function launchTests() {

    const cases: Promise<void>[] = [];
    const files = await fs.promises.readdir(testsFolder);

    files.forEach(async (file) => {
        cases.push(new Promise(async (res, rej) => {
            try {
                await execPromise(`pnpm cli -c -s -f "${path.join(testsFolder, file)}" -d "./test/tempOutput"`);
        
                console.info(`${file}: ✔ `);
            } catch (e) {
                console.info(`${file}: ✘`);
                //console.error(e);
            }

            res();
        }));
    });

    return Promise.all(cases);
}