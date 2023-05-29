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
        let RecoverLib: any;
        let recoverLibInstance: any;
        let domainSeparator: any;
        let signer: any;


        beforeEach(async () => {
            [ signer ] = await ethers.getSigners();
      
              RecoverLib = await ethers.getContractFactory("LibSignatureVerification_${def.struct.map(el=>el.name).join('_')}");
              recoverLibInstance = await RecoverLib.deploy();
              
              domainSeparator = await recoverLibInstance.buildDomainSeparator(
                "${def.domain.name}",
                ${def.domain.version},
                recoverLibInstance.address,
                );
        });

        ${buildRecoverTestCase(def)}
        ${/*buildVerifyTestCase(def)*/''}
    });`;
}