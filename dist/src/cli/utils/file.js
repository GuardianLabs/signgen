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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.test = exports.testWithTrace = exports.transpile = exports.compile = exports.prettifyTypescript = exports.prettifySolidity = exports.save = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const child_process_1 = require("child_process");
const util = __importStar(require("util"));
const config_1 = require("../../config");
const prettier_1 = __importDefault(require("prettier"));
const execPromise = util.promisify(child_process_1.exec);
function save({ dirPath, content, name, ext }) {
    const filePath = path.join(dirPath, `${name}${ext}`);
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
    fs.writeFileSync(filePath, content, 'utf8');
    return filePath;
}
exports.save = save;
function prettifySolidity(originalCode) {
    return prettier_1.default.format(originalCode, {
        parser: 'solidity-parse',
        pluginSearchDirs: ["."],
        plugins: ['prettier-plugin-solidity']
    });
}
exports.prettifySolidity = prettifySolidity;
function prettifyTypescript(originalCode) {
    return prettier_1.default.format(originalCode, {
        parser: 'babel'
    });
}
exports.prettifyTypescript = prettifyTypescript;
async function compile(targetFolder) {
    const { stdout, stderr } = await execPromise(`pnpm crossenv ${config_1.OUTPUT_CONTRACTS_PATH}=${path.join(targetFolder, "contracts")} ${config_1.OUTPUT_TESTS_PATH}=${path.join(targetFolder, "tests")} ${config_1.OUTPUT_CACHE_PATH}=${path.join(targetFolder, "cache")} ${config_1.OUTPUT_ARTIFACTS_PATH}=${path.join(targetFolder, "artifacts")} ${config_1.OUTPUT_TYPECHAIN_PATH}=${path.join(targetFolder, "typechain")} pnpm compile`);
    console.log(stdout, stderr);
}
exports.compile = compile;
async function transpile(targetFolder) {
    const { stdout, stderr } = await execPromise(`npx tsc ${targetFolder}/**/*.ts`);
    console.log(stdout, stderr);
}
exports.transpile = transpile;
async function testWithTrace(targetFolder) {
    const { stdout, stderr } = await execPromise(`pnpm crossenv ${config_1.OUTPUT_CONTRACTS_PATH}=${path.join(targetFolder, "contracts")} ${config_1.OUTPUT_TESTS_PATH}=${path.join(targetFolder, "tests")} ${config_1.OUTPUT_CACHE_PATH}=${path.join(targetFolder, "cache")} ${config_1.OUTPUT_ARTIFACTS_PATH}=${path.join(targetFolder, "artifacts")} ${config_1.OUTPUT_TYPECHAIN_PATH}=${path.join(targetFolder, "typechain")} pnpm test:trace`);
    console.log(stdout, stderr);
}
exports.testWithTrace = testWithTrace;
async function test(targetFolder) {
    const { stdout, stderr } = await execPromise(`pnpm crossenv ${config_1.OUTPUT_CONTRACTS_PATH}=${path.join(targetFolder, "contracts")} ${config_1.OUTPUT_TESTS_PATH}=${path.join(targetFolder, "tests")} ${config_1.OUTPUT_CACHE_PATH}=${path.join(targetFolder, "cache")} ${config_1.OUTPUT_ARTIFACTS_PATH}=${path.join(targetFolder, "artifacts")} ${config_1.OUTPUT_TYPECHAIN_PATH}=${path.join(targetFolder, "typechain")} pnpm test`);
    console.log(stdout, stderr);
}
exports.test = test;
//# sourceMappingURL=file.js.map