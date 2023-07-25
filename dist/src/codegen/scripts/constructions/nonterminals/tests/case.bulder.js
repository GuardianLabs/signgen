"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildVerifyNegativeTestCase = exports.buildVerifyPositiveTestCase = exports.buildRecoverTestCase = void 0;
const utils_1 = require("../../../../utils");
const terminals_1 = require("../../terminals");
const substrings_1 = require("../substrings");
const buildRecoverTestCase = (def) => def.struct
    .map(el => `
    it("should recover ${el.name} signer", async () => {
      const args: ${el.name}Message = {
        ${(0, substrings_1.composeObjectFields)(def, el.props)}
      }

      ${(0, utils_1.optionalString)(el.external, (0, substrings_1.composeConstantStubs)(def))}

        const params = await prepare${el.name}SignedMessage(
          args,
          ${(0, utils_1.optionalString)(el.external, substrings_1.composeArgument)}
          ${(0, utils_1.optionalComma)(el.external)}
          ${def.domain.verifyingContract || "recoverInstance.address"},
          signer
        );

        const recoveredAddress =
          await recoverInstance.recover${el.name}(
            args,
            params.signature,
            ${(0, utils_1.optionalString)(el.external, substrings_1.composeArgument)}
            ${(0, utils_1.optionalComma)(el.external)}
            domainSeparator
          );
          
        expect(recoveredAddress).to.be.equal(signer.address);
      });`)
    .join(terminals_1.BR);
exports.buildRecoverTestCase = buildRecoverTestCase;
const buildVerifyPositiveTestCase = (def) => def.struct
    .map(el => `
    it("should verify ${el.name} signer", async () => {
      const args: ${el.name}Message = {
        ${(0, substrings_1.composeObjectFields)(def, el.props)}
      }

      ${(0, utils_1.optionalString)(el.external, (props) => props.map(ext => `const ${ext.name} = ${(0, utils_1.pasteDefaultStub)(ext.type, def, ext)};`).join(terminals_1.BR))}

        const params = await prepare${el.name}SignedMessage(
          args,
          ${(0, utils_1.optionalString)(el.external, substrings_1.composeArgument)}
          ${(0, utils_1.optionalComma)(el.external)}
          ${def.domain.verifyingContract || "recoverInstance.address"},
          signer
        );

        await expect(recoverInstance.verify${el.name}(
          args,
          params.signature,
          ${(0, utils_1.optionalString)(el.external, substrings_1.composeArgument)}
          ${(0, utils_1.optionalComma)(el.external)}
          domainSeparator,
          signer.address,
          "${el.name} verification failed"
        )).to.be.not.revertedWith("${el.name} verification failed");
    });`)
    .join(terminals_1.BR);
exports.buildVerifyPositiveTestCase = buildVerifyPositiveTestCase;
const buildVerifyNegativeTestCase = (def) => def.struct
    .map(el => `
    it("should reject ${el.name} intruder", async () => {
      const args: ${el.name}Message = {
        ${(0, substrings_1.composeObjectFields)(def, el.props)}
      }

      ${(0, utils_1.optionalString)(el.external, (0, substrings_1.composeConstantStubs)(def))}

        const params = await prepare${el.name}SignedMessage(
          args,
          ${(0, utils_1.optionalString)(el.external, substrings_1.composeArgument)}
          ${(0, utils_1.optionalComma)(el.external)}
          ${def.domain.verifyingContract || "recoverInstance.address"},
          intruder
        );

        await expect(recoverInstance.verify${el.name}(
          args,
          params.signature,
          ${(0, utils_1.optionalString)(el.external, substrings_1.composeArgument)}
          ${(0, utils_1.optionalComma)(el.external)}
          domainSeparator,
          signer.address,
          "${el.name} verification failed"
        )).to.be.revertedWith("${el.name} verification failed");
    });`)
    .join(terminals_1.BR);
exports.buildVerifyNegativeTestCase = buildVerifyNegativeTestCase;
//# sourceMappingURL=case.bulder.js.map