import { HardhatUserConfig } from "hardhat/config";
import '@nomiclabs/hardhat-ethers'

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
    cache: "./cache",
    artifacts: "./artifacts"
  },
};

export default config;