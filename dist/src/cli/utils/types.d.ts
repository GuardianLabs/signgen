import "hardhat/types/runtime";
import "hardhat/types/config";
declare module "hardhat/types/runtime" {
    interface HardhatRuntimeEnvironment {
        setPaths(dir: string): void;
        changeNetwork(newNetwork: string): void;
    }
}
