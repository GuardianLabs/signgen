import '@nomiclabs/hardhat-ethers';
import '@nomicfoundation/hardhat-toolbox';
//import "hardhat-tracer";
import { extendEnvironment } from "hardhat/config";
import * as path from 'path';

const cwd = path.resolve();

extendEnvironment((hre: any) => {

  hre.setPaths = function setPaths(dir: any) {

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
          }
  }
})

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