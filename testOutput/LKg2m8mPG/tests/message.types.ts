import { BytesLike, BigNumberish } from "ethers";

export type TypeOneMessage = {
  operation: BigNumberish;
  contractAddress: string;
  rules: BigNumberish[];
  flag: boolean;
  approversGiven: BigNumberish[];
  logicsList: string[];
  constantsList: BytesLike;
  structure1: any;
  structure2: any;
  structure3: any;
  nonce: BytesLike;
};

export type TypeTwoMessage = {
  tests: string;
  testEnum: any;
};

export const TypeOneType = [
  { name: "operation", type: "uint256" },
  { name: "contractAddress", type: "address" },
  { name: "rules", type: "uint256[]" },
  { name: "flag", type: "bool" },
  { name: "approversGiven", type: "uint8[]" },
  { name: "logicsList", type: "address[]" },
  { name: "constantsList", type: "bytes" },
  { name: "structure1", type: "AStruct" },
  { name: "structure2", type: "BStruct" },
  { name: "structure3", type: "TypeTwo" },
  { name: "nonce", type: "bytes32" },
  { name: "operationId", type: "string" },
];

export const TypeTwoType = [
  { name: "tests", type: "string" },
  { name: "testEnum", type: "uint8" },
  { name: "structure3", type: "TypeTwo" },
];

export const BStructType = [{ name: "custom", type: "string" }];

export type PrepareParams<Y> = Omit<Y, "verifyingContract"> & {
  signature: BytesLike;
};

export const EIP712DomainType = [
  { name: "name", type: "string" },
  { name: "version", type: "string" },
  { name: "chainId", type: "uint256" },
  { name: "verifyingContract", type: "address" },
];
