import { HardhatUserConfig } from "hardhat/config";
import '@nomiclabs/hardhat-ethers'
import "hardhat-tracer";

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: process.env.OUTPUT_CONTRACTS_PATH,
    tests: process.env.OUTPUT_TESTS_PATH,
    cache: process.env.OUTPUT_CACHE_PATH,
    artifacts: process.env.OUTPUT_ARTIFACTS_PATH
  },
};

export default config;