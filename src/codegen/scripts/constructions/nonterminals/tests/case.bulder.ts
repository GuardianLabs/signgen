import { join } from "path";
import { IDefinition, IProperty } from "../../../../types";
import { optionalComma, optionalString, pasteDefaultStub } from "../../../../utils";
import { BR } from "../../terminals";
import { composeArgument, composeConstantStubs, composeObjectFields } from "../substrings";

export const buildRecoverTestCase = (def: IDefinition) => def.struct
    .map(el => `
    it("should recover ${el.name} signer", async () => {
      const args: ${el.name}Message = {
        ${composeObjectFields(def, el.props)}
      }

      ${optionalString(el.external, composeConstantStubs(def))}

        const params = await prepare${el.name}SignedMessage(
          args,
          ${optionalString(el.external, composeArgument)}
          ${optionalComma(el.external)}
          ${def.domain.verifyingContract || "recoverInstance.address"},
          signer
        );

        const recoveredAddress =
          await recoverInstance.recover${el.name}(
            args,
            params.signature,
            ${optionalString(el.external, composeArgument)}
            ${optionalComma(el.external)}
            domainSeparator
          );
          
        expect(recoveredAddress).to.be.equal(signer.address);
      });`)
    .join(BR);

export const buildVerifyPositiveTestCase = (def: IDefinition) => def.struct
    .map(el => `
    it("should verify ${el.name} signer", async () => {
      const args: ${el.name}Message = {
        ${composeObjectFields(def, el.props)}
      }

      ${optionalString(el.external, (props: IProperty[]) => props.map(ext => `const ${ext.name} = ${pasteDefaultStub(ext.type, def, ext)};`).join(BR))}

        const params = await prepare${el.name}SignedMessage(
          args,
          ${optionalString(el.external, composeArgument)}
          ${optionalComma(el.external)}
          ${def.domain.verifyingContract || "recoverInstance.address"},
          signer
        );

        await expect(recoverInstance.verify${el.name}(
          args,
          params.signature,
          ${optionalString(el.external, composeArgument)}
          ${optionalComma(el.external)}
          domainSeparator,
          signer.address,
          "${el.name} verification failed"
        )).to.be.not.revertedWith("${el.name} verification failed");
    });`)
    .join(BR);


export const buildVerifyNegativeTestCase = (def: IDefinition) => def.struct
    .map(el => `
    it("should reject ${el.name} intruder", async () => {
      const args: ${el.name}Message = {
        ${composeObjectFields(def, el.props)}
      }

      ${optionalString(el.external, composeConstantStubs(def))}

        const params = await prepare${el.name}SignedMessage(
          args,
          ${optionalString(el.external, composeArgument)}
          ${optionalComma(el.external)}
          ${def.domain.verifyingContract || "recoverInstance.address"},
          intruder
        );

        await expect(recoverInstance.verify${el.name}(
          args,
          params.signature,
          ${optionalString(el.external, composeArgument)}
          ${optionalComma(el.external)}
          domainSeparator,
          signer.address,
          "${el.name} verification failed"
        )).to.be.revertedWith("${el.name} verification failed");
    });`)
    .join(BR);