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
exports.test = exports.transpile = exports.compile = exports.prettifyTypescript = exports.prettifySolidity = exports.save = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const child_process_1 = require("child_process");
const util = __importStar(require("util"));
const prettier_1 = __importDefault(require("prettier"));
const hardhat_1 = __importDefault(require("hardhat"));
require("./types");
const execPromise = util.promisify(child_process_1.exec);
function setHardhatPaths(dir) {
    hardhat_1.default.setPaths(dir);
}
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
    setHardhatPaths(targetFolder);
    await hardhat_1.default.run('compile', {});
}
exports.compile = compile;
async function transpile(targetFolder) {
    const { stdout, stderr } = await execPromise(`npx tsc ${targetFolder}/**/*.ts`);
    console.log(stdout, stderr);
}
exports.transpile = transpile;
async function test(targetFolder, testFiles) {
    setHardhatPaths(targetFolder);
    await hardhat_1.default.run('test', {
        noCompile: true,
        testFiles: testFiles.map(testFile => path.join(path.join(targetFolder, 'tests'), testFile))
    });
}
exports.test = test;
//# sourceMappingURL=file.js.map