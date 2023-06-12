import { launchTests } from "./suite";
import { exec } from 'child_process';
import * as util from "util";
import { cwd } from "process";

const execPromise = util.promisify(exec);

(async () => {
    launchTests()
    .then(async () => {

        try {
            await execPromise(`rd /s /q "./test/tempOutput"`);
        } catch(e) {
            console.error(e);
        }
    })
    .catch(err => console.error(err))
})();