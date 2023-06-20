#!/usr/bin/env node

import { Command } from "commander";
import { version } from '../package.json';
import exec from './cli';

const program = new Command();

program
  .name('eip712_codegen')
  .description('EIP712 artifacts generator')
  .option("-f, --file  <path>", "Data to sign type definitions file path")
  .option("-d, --dist  <path>", "Destination folder")
  .option("-c, --contract", "Generate contract artifacts")
  .option("-s, --script", "Generate scripts artifacts")
  .version(version);

program.parse();

exec(program.opts());