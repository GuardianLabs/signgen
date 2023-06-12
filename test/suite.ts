import * as fs from "fs";
import * as path from 'path';
import { exec } from 'child_process';
import * as util from "util";
import { cwd } from "process";

const testsFolder = './test/definitions';

const execPromise = util.promisify(exec);

export async function launchTests() {

    fs.readdir(testsFolder, async (err, files) => {
        if(err) console.error(err);

        files.forEach(async (file) => {
          
          try {
            await execPromise(`pnpm cli -c -s -f "${path.join(testsFolder, file)}" -d "./test/testOutput"`);

            console.info(`${file}: ✔ `);
          } catch (e) {
            console.info(`${file}: ✘`);
            console.error(e);
          }
        });
    });
}