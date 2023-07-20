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
require("@nomiclabs/hardhat-ethers");
require("@nomicfoundation/hardhat-toolbox");
const config_1 = require("hardhat/config");
const path = __importStar(require("path"));
const cwd = path.resolve();
(0, config_1.extendEnvironment)((hre) => {
    hre.setPaths = function setPaths(dir) {
        this.config.paths = {
            sources: path.join(dir, "contracts"),
            tests: path.join(dir, "tests"),
            cache: path.join(dir, "cache"),
            artifacts: path.join(dir, "artifacts"),
            root: dir,
            configFile: this.config.paths.configFile
        };
        this.artifacts._artifactsPath = path.join(dir, "artifacts");
        this.config.typechain = {
            outDir: path.join(dir, "typechain"),
            target: 'ethers-v5',
            alwaysGenerateOverloads: false,
            discriminateTypes: false,
            tsNocheck: false,
            dontOverrideCompile: false
        };
    };
});
const config = {
    defaultNetwork: "hardhat",
    solidity: {
        version: "0.8.19",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200
            }
        }
    }
};
module.exports = config;
//# sourceMappingURL=hardhat.config.js.map