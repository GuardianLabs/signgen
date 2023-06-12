// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "./ParamStructs.sol";
import "./TypeHashDefinitions.sol";

contract SignatureVerification_TypeOne_TypeTwo {
    function hashTypedDataV4(
        bytes32 structHash,
        bytes32 domainSeparator
    ) internal pure returns (bytes32) {
        return ECDSA.toTypedDataHash(domainSeparator, structHash);
    }

    function hashAndRecover(
        bytes32 structHash,
        bytes memory signature,
        bytes32 domainSeparator
    ) internal pure returns (address originalSigner) {
        bytes32 hash = hashTypedDataV4(structHash, domainSeparator);
        originalSigner = ECDSA.recover(hash, signature);
    }

    function buildDomainSeparator(
        string memory domainName,
        string memory version,
        address verifyingContract
    ) external view returns (bytes32) {
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
    }

    function encodeStringArray(
        string[] memory arr
    ) internal pure returns (bytes32) {
        bytes32[] memory encodedStrings = new bytes32[](arr.length);

        for (uint256 i = 0; i < arr.length; i++) {
            encodedStrings[i] = keccak256(bytes((arr[i])));
        }

        return keccak256(abi.encodePacked(encodedStrings));
    }

    function encodeBytesArray(
        bytes[] memory arr
    ) internal pure returns (bytes32) {
        bytes32[] memory encodedBytes = new bytes32[](arr.length);

        for (uint256 i = 0; i < arr.length; i++) {
            encodedBytes[i] = keccak256(arr[i]);
        }

        return keccak256(abi.encodePacked(encodedBytes));
    }

    // For elimination of "Stack too deep" error

    function encodeTypeOneParameters(
        TypeOne calldata message,
        string calldata operationId
    ) internal pure returns (bytes memory) {
        return
            abi.encode(
                TYPE_ONE_TYPEHASH,
                message.operation,
                message.contractAddress,
                keccak256(abi.encodePacked(message.rules)),
                message.flag,
                keccak256(abi.encodePacked(message.approversGiven)),
                keccak256(abi.encodePacked(message.logicsList)),
                keccak256(message.constantsList),
                keccak256(
                    abi.encode(A_STRUCT_TYPEHASH, message.structure1.exists)
                ),
                keccak256(
                    abi.encode(
                        B_STRUCT_TYPEHASH,
                        keccak256(bytes(message.structure2.custom))
                    )
                ),
                keccak256(
                    abi.encode(
                        TYPE_TWO_TYPEHASH,
                        keccak256(bytes(message.structure3.tests)),
                        uint8(message.structure3.testEnum)
                    )
                ),
                message.nonce,
                keccak256(bytes(operationId))
            );
    }

    function encodeTypeTwoParameters(
        TypeTwo calldata message,
        TypeTwo calldata structure3
    ) internal pure returns (bytes memory) {
        return
            abi.encode(
                TYPE_TWO_TYPEHASH,
                keccak256(bytes(message.tests)),
                uint8(message.testEnum),
                keccak256(
                    abi.encode(
                        TYPE_TWO_TYPEHASH,
                        keccak256(bytes(structure3.tests)),
                        uint8(structure3.testEnum)
                    )
                )
            );
    }

    function recoverTypeOne(
        TypeOne calldata message,
        bytes calldata signature,
        string calldata operationId,
        bytes32 domainSeparator
    ) public pure returns (address) {
        bytes32 structHash = keccak256(
            encodeTypeOneParameters(message, operationId)
        );

        return hashAndRecover(structHash, signature, domainSeparator);
    }

    function recoverTypeTwo(
        TypeTwo calldata message,
        bytes calldata signature,
        TypeTwo calldata structure3,
        bytes32 domainSeparator
    ) public pure returns (address) {
        bytes32 structHash = keccak256(
            encodeTypeTwoParameters(message, structure3)
        );

        return hashAndRecover(structHash, signature, domainSeparator);
    }

    function verifyTypeOne(
        TypeOne calldata message,
        bytes calldata signature,
        string calldata operationId,
        bytes32 domainSeparator,
        address addr,
        string calldata errMessage
    ) public pure {
        require(
            recoverTypeOne(message, signature, operationId, domainSeparator) ==
                addr,
            errMessage
        );
    }

    function verifyTypeTwo(
        TypeTwo calldata message,
        bytes calldata signature,
        TypeTwo calldata structure3,
        bytes32 domainSeparator,
        address addr,
        string calldata errMessage
    ) public pure {
        require(
            recoverTypeTwo(message, signature, structure3, domainSeparator) ==
                addr,
            errMessage
        );
    }
}
