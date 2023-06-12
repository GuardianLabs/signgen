import { ethers, network } from "hardhat";
import { expect } from "chai";

import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/src/signers";
import { BigNumberish } from "ethers";

import {
  prepareTypeOneSignedMessage,
  prepareTypeTwoSignedMessage,
} from "./TypeOneTypeTwo.utils";
import { TypeOneMessage, TypeTwoMessage } from "./message.types";

describe("TypeOne, TypeTwo signatures", () => {
  let Recover: any;
  let recoverInstance: any;
  let domainSeparator: any;
  let signer: any;
  let intruder: any;

  beforeEach(async () => {
    [signer, intruder] = await ethers.getSigners();

    Recover = await ethers.getContractFactory(
      "SignatureVerification_TypeOne_TypeTwo"
    );
    recoverInstance = await Recover.deploy();

    domainSeparator = await recoverInstance.buildDomainSeparator(
      "Sample",
      "1",
      recoverInstance.address.toString()
    );
  });

  it("should recover TypeOne signer", async () => {
    const args: TypeOneMessage = {
      operation: 0,
      contractAddress: "0x0000000000000000000000000000000000000000",
      rules: [0],
      flag: false,
      approversGiven: [0],
      logicsList: ["0x0000000000000000000000000000000000000000"],
      constantsList:
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      structure1: {
        exists: false,
      },
      structure2: {
        custom: "stub",
      },
      structure3: {
        tests: "stub",
        testEnum: 0,
      },
      nonce:
        "0x0000000000000000000000000000000000000000000000000000000000000000",
    };

    const operationId = "stub";

    const params = await prepareTypeOneSignedMessage(
      args,
      operationId,
      recoverInstance.address,
      signer
    );

    const recoveredAddress = await recoverInstance.recoverTypeOne(
      args,
      params.signature,
      operationId,
      domainSeparator
    );

    expect(recoveredAddress).to.be.equal(signer.address);
  });

  it("should recover TypeTwo signer", async () => {
    const args: TypeTwoMessage = {
      tests: "stub",
      testEnum: 0,
    };

    const params = await prepareTypeTwoSignedMessage(
      args,

      recoverInstance.address,
      signer
    );

    const recoveredAddress = await recoverInstance.recoverTypeTwo(
      args,
      params.signature,

      domainSeparator
    );

    expect(recoveredAddress).to.be.equal(signer.address);
  });

  it("should verify TypeOne signer", async () => {
    const args: TypeOneMessage = {
      operation: 0,
      contractAddress: "0x0000000000000000000000000000000000000000",
      rules: [0],
      flag: false,
      approversGiven: [0],
      logicsList: ["0x0000000000000000000000000000000000000000"],
      constantsList:
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      structure1: {
        exists: false,
      },
      structure2: {
        custom: "stub",
      },
      structure3: {
        tests: "stub",
        testEnum: 0,
      },
      nonce:
        "0x0000000000000000000000000000000000000000000000000000000000000000",
    };

    const operationId = "stub";

    const params = await prepareTypeOneSignedMessage(
      args,
      operationId,
      recoverInstance.address,
      signer
    );

    await expect(
      recoverInstance.verifyTypeOne(
        args,
        params.signature,
        operationId,
        domainSeparator,
        signer.address,
        "TypeOne verification failed"
      )
    ).to.be.not.revertedWith("TypeOne verification failed");
  });

  it("should verify TypeTwo signer", async () => {
    const args: TypeTwoMessage = {
      tests: "stub",
      testEnum: 0,
    };

    const params = await prepareTypeTwoSignedMessage(
      args,

      recoverInstance.address,
      signer
    );

    await expect(
      recoverInstance.verifyTypeTwo(
        args,
        params.signature,

        domainSeparator,
        signer.address,
        "TypeTwo verification failed"
      )
    ).to.be.not.revertedWith("TypeTwo verification failed");
  });

  it("should reject TypeOne intruder", async () => {
    const args: TypeOneMessage = {
      operation: 0,
      contractAddress: "0x0000000000000000000000000000000000000000",
      rules: [0],
      flag: false,
      approversGiven: [0],
      logicsList: ["0x0000000000000000000000000000000000000000"],
      constantsList:
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      structure1: {
        exists: false,
      },
      structure2: {
        custom: "stub",
      },
      structure3: {
        tests: "stub",
        testEnum: 0,
      },
      nonce:
        "0x0000000000000000000000000000000000000000000000000000000000000000",
    };

    const operationId = "stub";

    const params = await prepareTypeOneSignedMessage(
      args,
      operationId,
      recoverInstance.address,
      intruder
    );

    await expect(
      recoverInstance.verifyTypeOne(
        args,
        params.signature,
        operationId,
        domainSeparator,
        signer.address,
        "TypeOne verification failed"
      )
    ).to.be.revertedWith("TypeOne verification failed");
  });

  it("should reject TypeTwo intruder", async () => {
    const args: TypeTwoMessage = {
      tests: "stub",
      testEnum: 0,
    };

    const params = await prepareTypeTwoSignedMessage(
      args,

      recoverInstance.address,
      intruder
    );

    await expect(
      recoverInstance.verifyTypeTwo(
        args,
        params.signature,

        domainSeparator,
        signer.address,
        "TypeTwo verification failed"
      )
    ).to.be.revertedWith("TypeTwo verification failed");
  });
});
