import { IDefinition } from "../../../../types";
import {
  buildRecoverTestCase,
  buildVerifyNegativeTestCase,
  buildVerifyPositiveTestCase,
} from "./case.bulder";

export const buildTestSuite = (def: IDefinition) => {
  return `
    import { ethers } from "hardhat";
    import { expect } from "chai";
    import { getDomainName, getDomainVersion } from "../src";

    import { ${def.struct
      .map((el) => `prepare${el.name}SignedMessage`)
      .join(", ")}, ${def.struct
      .map((el) => `${el.name}Message`)
      .join(", ")} } from "../src";

    describe(\`${def.struct
      .map((el) => el.name)
      .join(", ")} signatures\`, () => {
        let Recover: any;
        let recoverInstance: any;
        let domainSeparator: any;
        let signer: any;
        let intruder: any;


        beforeEach(async () => {
            [ signer, intruder ] = await ethers.getSigners();
      
              Recover = await ethers.getContractFactory("SignatureVerification"); // _${def.struct
                .map((el) => el.name)
                .join("_")}
              recoverInstance = await Recover.deploy(getDomainName(), getDomainVersion());
              
              domainSeparator =
              ${
                def.domain.salt
                  ? `
                await recoverInstance.buildDomainSeparatorWithSalt(
                    ${
                      def.domain.verifyingContract ||
                      "recoverInstance.address.toString()"
                    },
                    ${def.domain.salt}
                );
                `
                  : `
                await recoverInstance.buildDomainSeparator(
                    ${
                      def.domain.verifyingContract ||
                      "recoverInstance.address.toString()"
                    }
                );`
              }
        });

        ${buildRecoverTestCase(def)}
        
        ${buildVerifyPositiveTestCase(def)}

        ${buildVerifyNegativeTestCase(def)}
    });`;
};
