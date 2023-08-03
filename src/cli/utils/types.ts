import "hardhat/types/config";
import "hardhat/types/runtime";

declare module "hardhat/types/runtime" {
  export interface HardhatRuntimeEnvironment {
    setPaths(dir: string): void;
  }
}
