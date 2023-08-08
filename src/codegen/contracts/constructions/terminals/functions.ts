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
) private pure returns (bytes32) {
    return ECDSA.toTypedDataHash(domainSeparator, structHash);
}`;

export const BUILD_DOMAIN_SEPARATOR_WITH_SALT = `

function buildDomainSeparatorWithSalt(
    string memory domainName,
    string memory version,
    address verifyingContract,
    bytes32 salt
) internal view returns (bytes32) {
    bytes32 hashedDomainName = keccak256(bytes(domainName));
    bytes32 hashedVersion = keccak256(bytes(version));

    return
        keccak256(
            abi.encode(
                DOMAIN_TYPE_HASH,
                hashedDomainName,
                hashedVersion,
                block.chainid,
                verifyingContract,
                salt
            )
        );
}`;

export const BUILD_DOMAIN_SEPARATOR_PROXY = `

function buildDomainSeparator (
    address verifyingContract
) public view returns (bytes32) {

    return Util.buildDomainSeparator(_domainName, _domainVersion, verifyingContract);
}

function buildDomainSeparatorWithSalt (
    address verifyingContract,
    bytes32 salt
) public view returns (bytes32) {

    return Util.buildDomainSeparatorWithSalt(_domainName, _domainVersion, verifyingContract, salt);
}
`;

export const BUILD_DOMAIN_SEPARATOR = `

function buildDomainSeparator(
    string memory domainName,
    string memory version,
    address verifyingContract
) internal view returns (bytes32) {
    bytes32 hashedDomainName = keccak256(bytes(domainName));
    bytes32 hashedVersion = keccak256(bytes(version));

    return
        keccak256(
            abi.encode(
                DOMAIN_TYPE_HASH,
                hashedDomainName,
                hashedVersion,
                block.chainid,
                verifyingContract
            )
        );
}`;

export const ENCODE_STRING_ARRAY = `
    function encodeStringArray(string[] memory arr) internal pure returns (bytes32) {
        bytes32[] memory encodedStrings = new bytes32[](arr.length);

        for (uint256 i = 0; i < arr.length; i++) {
            encodedStrings[i] = keccak256(bytes((arr[i])));
        }

        return keccak256(abi.encodePacked(encodedStrings));
    }
`;

export const ENCODE_BYTES_ARRAY = `
    function encodeBytesArray(bytes[] memory arr) internal pure returns (bytes32) {
        bytes32[] memory encodedBytes = new bytes32[](arr.length);

        for (uint256 i = 0; i < arr.length; i++) {
            encodedBytes[i] = keccak256(arr[i]);
        }

        return keccak256(abi.encodePacked(encodedBytes));
    }
`;
