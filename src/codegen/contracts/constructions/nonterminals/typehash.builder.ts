import { formatCapitalSnake } from "../../../utils/string.format";

export const buildTypeHash = () => `
bytes32 constant ${formatCapitalSnake("UpdateDb")}_TYPEHASH = keccak256(
    "UnstakeAsset(bytes32 internalAssetId,uint256 nonce,string operationType,uint256 timestamp)"
);
`