import { IDefinition } from "../../../../types";
import { buildRecoverTestCase, buildVerifyNegativeTestCase, buildVerifyPositiveTestCase } from "./case.bulder";

export const buildTestSuite = (def: IDefinition) => {

    // todo: buildDomainSeparator per name ==> singleton
    return `
    import { ethers } from "hardhat";
    import { expect } from "chai";

    import { ${def.struct.map(el => `prepare${el.name}SignedMessage`).join(', ')}, ${def.struct.map(el => `${el.name}Message`).join(', ')} } from "../src";

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
                await recoverInstance.buildDomainSeparator${def.struct[0].name}WithSalt(
                    "${def.domain.name}",
                    "${def.domain.version}",
                    ${def.domain.verifyingContract || "recoverInstance.address.toString()"},
                    ${def.domain.salt}
                );
                ` : `
                await recoverInstance.buildDomainSeparator${def.struct[0].name}(
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