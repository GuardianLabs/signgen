export const DOMAIN_TYPEHASH = `bytes32 constant DOMAIN_TYPE_HASH = keccak256(
    "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
);`;

export const DOMAIN_TYPEHASH_WITH_SALT = `bytes32 constant DOMAIN_TYPE_HASH = keccak256(
    "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract,bytes32 salt)"
);`;