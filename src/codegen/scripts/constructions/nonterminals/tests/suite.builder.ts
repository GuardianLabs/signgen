import { IDefinition } from "../../../../types";
import { buildRecoverTestCase, buildVerifyTestCase } from "./case.bulder";

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


        beforeEach(async () => {
            [ signer ] = await ethers.getSigners();
      
              Recover = await ethers.getContractFactory("SignatureVerification_${def.struct.map(el=>el.name).join('_')}");
              recoverInstance = await Recover.deploy();
              
              domainSeparator = await recoverInstance.buildDomainSeparator(
                "${def.domain.name}",
                "${def.domain.version}",
                ${def.domain.verifyingContract || "recoverInstance.address.toString()"}
                );
        });

        ${buildRecoverTestCase(def)}
        
        ${buildVerifyTestCase(def)}
    });`;
}