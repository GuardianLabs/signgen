export const HASH_AND_RECOVER = `
function hashAndRecover (
    bytes32 structHash,
    bytes memory signature,
    bytes32 domainSeparator
) internal pure returns (address originalSigner) {
    bytes32 hash = hashTypedDataV4(structHash, domainSeparator);
    originalSigner = ECDSA.recover(hash, signature);
}`;

export const HASH_TYPED_DATA_V4 = `
function hashTypedDataV4(
    bytes32 structHash,
    bytes32 domainSeparator
) internal pure returns (bytes32) {
    return ECDSA.toTypedDataHash(domainSeparator, structHash);
}`;

