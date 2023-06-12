// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.19;

bytes32 constant DOMAIN_TYPE_HASH = keccak256(
    "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
);

bytes32 constant TYPE_ONE_TYPEHASH = keccak256(
    "TypeOne(uint256 operation,address contractAddress,uint256[] rules,bool flag,uint8[] approversGiven,address[] logicsList,bytes constantsList,AStruct structure1,BStruct structure2,TypeTwo structure3,bytes32 nonce,string operationId)AStruct(bool exists)BStruct(string custom)TypeTwo(string tests,uint8 testEnum,TypeTwo structure3)"
);

bytes32 constant TYPE_TWO_TYPEHASH = keccak256(
    "TypeTwo(string tests,uint8 testEnum,TypeTwo structure3)TypeTwo(bool exists)"
);

bytes32 constant B_STRUCT_TYPEHASH = keccak256("BStruct(string custom)");

bytes32 constant A_STRUCT_TYPEHASH = keccak256("AStruct(bool exists)");
