import * as fs from "fs";
import * as path from 'path';
import { exec } from 'child_process';
import * as util from "util";
import { cwd } from "process";

const testsFolder = './test/definitions';

export async function launchTests() {

    fs.readdir(testsFolder, (err, files) => {
        if(err) console.error(err);

        files.forEach(file => {
          
          exec(`pnpm cli -c -s -f "${path.join(testsFolder, file)}" -d "./testOutput"`, 
          (err, out) => {
              if(err) {
                console.error(err, out);
                console.info(`${file}: ✘`);
              } else {
                console.info(`${file}: ✔ `);
              }
          })
        });
    });
}