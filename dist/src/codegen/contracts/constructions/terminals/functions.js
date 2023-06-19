"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENCODE_BYTES_ARRAY = exports.ENCODE_STRING_ARRAY = exports.BUILD_DOMAIN_SEPARATOR = exports.BUILD_DOMAIN_SEPARATOR_WITH_SALT = exports.HASH_TYPED_DATA_V4 = exports.HASH_AND_RECOVER = void 0;
exports.HASH_AND_RECOVER = `
function hashAndRecover (
    bytes32 structHash,
    bytes memory signature,
    bytes32 domainSeparator
) internal pure returns (address originalSigner) {
    bytes32 hash = hashTypedDataV4(structHash, domainSeparator);
    originalSigner = ECDSA.recover(hash, signature);
}`;
exports.HASH_TYPED_DATA_V4 = `
function hashTypedDataV4(
    bytes32 structHash,
    bytes32 domainSeparator
) internal pure returns (bytes32) {
    return ECDSA.toTypedDataHash(domainSeparator, structHash);
}`;
exports.BUILD_DOMAIN_SEPARATOR_WITH_SALT = `

function buildDomainSeparatorWithSalt(
    string memory domainName,
    string memory version,
    address verifyingContract,
    bytes32 salt
) external  view returns (bytes32) {
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
exports.BUILD_DOMAIN_SEPARATOR = `

function buildDomainSeparator(
    string memory domainName,
    string memory version,
    address verifyingContract
) external  view returns (bytes32) {
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
exports.ENCODE_STRING_ARRAY = `
    function encodeStringArray(string[] memory arr) internal pure returns (bytes32) {
        bytes32[] memory encodedStrings = new bytes32[](arr.length);

        for (uint256 i = 0; i < arr.length; i++) {
            encodedStrings[i] = keccak256(bytes((arr[i])));
        }

        return keccak256(abi.encodePacked(encodedStrings));
    }
`;
exports.ENCODE_BYTES_ARRAY = `
    function encodeBytesArray(bytes[] memory arr) internal pure returns (bytes32) {
        bytes32[] memory encodedBytes = new bytes32[](arr.length);

        for (uint256 i = 0; i < arr.length; i++) {
            encodedBytes[i] = keccak256(arr[i]);
        }

        return keccak256(abi.encodePacked(encodedBytes));
    }
`;
//# sourceMappingURL=functions.js.map