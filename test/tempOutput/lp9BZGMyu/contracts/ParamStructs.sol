// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.19;

enum Operations {
    EXISTS
}

struct TypeOne {
    uint256 operation;
    address contractAddress;
    uint256[] rules;
    bool flag;
    uint8[] approversGiven;
    address[] logicsList;
    bytes constantsList;
    AStruct structure1;
    BStruct structure2;
    TypeTwo structure3;
    TypeTwo structure4;
    TypeTwo structure5;
    TypeTwo structure6;
    bytes32 nonce;
}

struct TypeTwo {
    string tests;
    Operations testEnum;
}

struct TypeOneSigned {
    TypeOne message;
    bytes signature;
}

struct TypeTwoSigned {
    TypeTwo message;
    bytes signature;
}

struct BStruct {
    string custom;
}

struct AStruct {
    bool exists;
}
