import { launchTests } from "./suite";
import { exec } from 'child_process';
import * as util from "util";
import { cwd } from "process";

const execPromise = util.promisify(exec);

// Test entrypoint, needed to delete temporary output in a proper order

void async function () {
    launchTests()
    .then(async () => {

        try {
            await execPromise(`rimraf "./e2e/tempOutput"`);
        } catch(e) {
            console.error(e);
        }
    })
    .catch(err => console.error(err))
} ();