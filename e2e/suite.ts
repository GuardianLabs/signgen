import * as fs from "fs";
import * as path from 'path';
import { exec } from 'child_process';

const testsFolder = './e2e/definitions';

export async function launchTests() {

    const cases: Promise<void>[] = [];
    const files = await fs.promises.readdir(testsFolder);

    files.forEach(async (file) => {
        cases.push(new Promise(async (res, rej) => {
            try {
                exec(`pnpm cli -c -s -f "${path.join(testsFolder, file)}" -d "./e2e/tempOutput"`, (err, stdout, stderr) => {

                    if(err) {
                        console.info(`${file}: ✘`);
                        // console.error(err);
                    } else {
                        console.info(`${file}: ✔ `);
                    }

                    res();
                })
            } catch (e) {
                console.info(`${file}: ✘`);
                console.error(e);

                res();
            }
        }));
    });

    return Promise.all(cases);
}