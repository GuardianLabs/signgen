"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const shortid = __importStar(require("shortid"));
const generate_contract_artifacts_option_1 = require("./generate-contract-artifacts.option");
const generate_script_artifacts_option_1 = require("./generate-script-artifacts.option");
const utils_1 = require("./utils");
const cwd = path.resolve();
let definitionSourcePath;
let destinationFolder;
async function default_1(opts) {
    definitionSourcePath = opts.file ? path.join(cwd, opts.file) : path.join(cwd, 'definition.js');
    destinationFolder = opts.dist || path.join(cwd, 'output');
    const definition = (await Promise.resolve(`${definitionSourcePath}`).then(s => __importStar(require(s)))).default;
    let verifyingContract = definition.domain.verifyingContract;
    if (verifyingContract)
        definition.domain.verifyingContract = `"${verifyingContract}"`;
    let salt = definition.domain.salt;
    if (salt)
        definition.domain.salt = `"${salt}"`;
    (0, utils_1.validateDefinition)(definition);
    const version = shortid.generate()
        .replace('-', '')
        .replace('_', '');
    console.info(`Version: ${version}`);
    destinationFolder = path.join(destinationFolder, version);
    if (opts.contract) {
        await (0, generate_contract_artifacts_option_1.generateContractArtifacts)(definition, destinationFolder);
    }
    if (opts.script) {
        await (0, generate_script_artifacts_option_1.generateScriptArtifacts)(definition, destinationFolder);
    }
    if (opts.contract && opts.script) {
        await (0, utils_1.test)(destinationFolder);
    }
}
exports.default = default_1;
//# sourceMappingURL=index.js.map