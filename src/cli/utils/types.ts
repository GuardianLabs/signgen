import "hardhat/types/runtime";
import { EthereumProvider } from "hardhat/types/provider";
import * as path from 'path';
import "hardhat/types/config";

declare module "hardhat/types/runtime" {

  export interface HardhatRuntimeEnvironment {
    setPaths(dir: string): void;
  }
}