import { HardhatUserConfig } from "hardhat/config";

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  paths: {
    sources: process.env.OUTPUT_PATH,
    tests: process.env.OUTPUT_PATH,
    cache: "./cache",
    artifacts: "./artifacts"
  },
};

export default config;