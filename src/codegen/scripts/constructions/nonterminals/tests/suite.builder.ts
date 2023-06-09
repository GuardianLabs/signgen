import { IDefinition } from "../../../../types";
import { buildRecoverTestCase, buildVerifyNegativeTestCase, buildVerifyPositiveTestCase } from "./case.bulder";

export const buildTestSuite = (def: IDefinition) => {

    return `
    import { ethers, network } from "hardhat";
    import { expect } from "chai";

    import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/src/signers";
    import { BigNumberish } from "ethers";

    import { ${def.struct.map(el => `prepare${el.name}SignedMessage`).join(', ')} } from "./${def.struct.map(el=>el.name).join('')}.utils";
    import { ${def.struct.map(el => `${el.name}Message`).join(', ')} } from "./message.types";

    describe('${def.struct.map(el => el.name).join(', ')} signatures', () => {
        let Recover: any;
        let recoverInstance: any;
        let domainSeparator: any;
        let signer: any;
        let intruder: any;


        beforeEach(async () => {
            [ signer, intruder ] = await ethers.getSigners();
      
              Recover = await ethers.getContractFactory("SignatureVerification_${def.struct.map(el=>el.name).join('_')}");
              recoverInstance = await Recover.deploy();
              
              domainSeparator =
              ${def.domain.salt ?
                `
                await recoverInstance.buildDomainSeparatorWithSalt(
                    "${def.domain.name}",
                    "${def.domain.version}",
                    ${def.domain.verifyingContract || "recoverInstance.address.toString()"},
                    ${def.domain.salt}
                    );
                ` : `
                await recoverInstance.buildDomainSeparator(
                    "${def.domain.name}",
                    "${def.domain.version}",
                    ${def.domain.verifyingContract || "recoverInstance.address.toString()"}
                );`}
        });

        ${buildRecoverTestCase(def)}
        
        ${buildVerifyPositiveTestCase(def)}

        ${buildVerifyNegativeTestCase(def)}
    });`;
}