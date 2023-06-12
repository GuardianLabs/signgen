import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/src/signers";
import {
  TypeOneMessage,
  TypeOneType,
  TypeTwoMessage,
  TypeTwoType,
  EIP712DomainType,
  BStructType,
} from "./message.types";

export const buildTypeOneMessage = (
  rawMessage: TypeOneMessage,
  operationId: string,
  chainId: number,
  verifyingContract: string
) => {
  const message = {
    ...rawMessage,
    operationId,
  };

  return {
    domain: {
      chainId,
      name: "Sample",
      verifyingContract,
      version: "1",
    },
    message,
    primaryType: "TypeOne",
    types: {
      // self
      TypeOne: TypeOneType,

      // undefined

      AStruct: [{ name: "exists", type: "bool" }],

      // internal

      TypeTwo: TypeTwoType,

      // related

      BStruct: BStructType,
    },
  };
};

export const buildTypeTwoMessage = (
  rawMessage: TypeTwoMessage,
  structure3: any,
  chainId: number,
  verifyingContract: string
) => {
  const message = {
    ...rawMessage,
    structure3,
  };

  return {
    domain: {
      chainId,
      name: "Sample",
      verifyingContract,
      version: "1",
    },
    message,
    primaryType: "TypeTwo",
    types: {
      // self
      TypeTwo: TypeTwoType,

      // undefined

      // internal

      TypeTwo: TypeTwoType,

      // related
    },
  };
};

export const prepareTypeOneSignedMessage = async (
  struct: TypeOneMessage,
  operationId: string,
  verifyingContract: string,
  signer: SignerWithAddress
) => {
  const chainId = await signer.getChainId();
  const { domain, types, message } = buildTypeOneMessage(
    struct,
    operationId,
    chainId,
    verifyingContract
  );

  const signature = await signer._signTypedData(domain, types, message);

  return {
    message: struct,
    signature,
  };
};

export const prepareTypeTwoSignedMessage = async (
  struct: TypeTwoMessage,
  structure3: any,
  verifyingContract: string,
  signer: SignerWithAddress
) => {
  const chainId = await signer.getChainId();
  const { domain, types, message } = buildTypeTwoMessage(
    struct,
    structure3,
    chainId,
    verifyingContract
  );

  const signature = await signer._signTypedData(domain, types, message);

  return {
    message: struct,
    signature,
  };
};
