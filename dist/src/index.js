#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const package_json_1 = require("../package.json");
const cli_1 = __importDefault(require("./cli"));
const program = new commander_1.Command();
program
    .name('eip712_codegen')
    .description('EIP712 artifacts generator')
    .option("-f, --file  <path>", "Data to sign type definitions file path")
    .option("-d, --dist  <path>", "Destination folder")
    .option("-c, --contract", "Generate contract artifacts")
    .option("-s, --script", "Generate scripts artifacts")
    .option("-l, --launch", "Automatically launch generated tests (if -c -s passed)")
    .version(package_json_1.version);
program.parse();
(0, cli_1.default)(program.opts());
//# sourceMappingURL=index.js.map