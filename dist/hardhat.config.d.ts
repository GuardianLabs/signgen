import { HardhatUserConfig } from "hardhat/config";
import '@nomiclabs/hardhat-ethers';
import '@nomicfoundation/hardhat-toolbox';
import './src/cli/utils/types';
declare const config: HardhatUserConfig;
export default config;
