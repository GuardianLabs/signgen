import { launchTests } from "./suite";
import { exec } from 'child_process';
import * as util from "util";
import { cwd } from "process";

const execPromise = util.promisify(exec);

(async () => {
    await launchTests();
    
    try {
        await execPromise(`rd /s /q "./test/testOutput"`);
    } catch(e) {
        console.error(e);
    }
})();