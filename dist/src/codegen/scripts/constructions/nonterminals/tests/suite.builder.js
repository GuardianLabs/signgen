"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildTestSuite = void 0;
const case_bulder_1 = require("./case.bulder");
const buildTestSuite = (def) => {
    return `
    import { ethers } from "hardhat";
    import { expect } from "chai";

    import { ${def.struct.map(el => `prepare${el.name}SignedMessage`).join(', ')} } from "./${def.struct.map(el => el.name).join('')}.utils";
    import { ${def.struct.map(el => `${el.name}Message`).join(', ')} } from "./message.types";

    describe('${def.struct.map(el => el.name).join(', ')} signatures', () => {
        let Recover: any;
        let recoverInstance: any;
        let domainSeparator: any;
        let signer: any;
        let intruder: any;


        beforeEach(async () => {
            [ signer, intruder ] = await ethers.getSigners();
      
              Recover = await ethers.getContractFactory("SignatureVerification_${def.struct.map(el => el.name).join('_')}");
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

        ${(0, case_bulder_1.buildRecoverTestCase)(def)}
        
        ${(0, case_bulder_1.buildVerifyPositiveTestCase)(def)}

        ${(0, case_bulder_1.buildVerifyNegativeTestCase)(def)}
    });`;
};
exports.buildTestSuite = buildTestSuite;
//# sourceMappingURL=suite.builder.js.map