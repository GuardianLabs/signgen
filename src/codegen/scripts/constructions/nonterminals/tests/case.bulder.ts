import { join } from "path";
import { IDefinition } from "../../../../types";
import { pasteDefaultStub } from "../../../../utils";
import { BR } from "../../terminals";

export const buildRecoverTestCase = (def: IDefinition) => def.struct
    .map(el => `
    it("should recover ${el.name} signer", async () => {
      const args: ${el.name}Message = {
        ${el.props.map(prop => `${prop.name}: ${pasteDefaultStub(prop.type, def, prop)}`).join(',' + BR)}
      }

      ${el.external.length != 0 ? el.external.map(ext => `const ${ext.name} = ${pasteDefaultStub(ext.type, def, ext)};`).join(BR) : ''}

        const params = await prepare${el.name}SignedMessage(
          args,
          ${el.external.length != 0 ? el.external.map(ext => `${ext.name}`).join(',' + BR) : ''} ${el.external.length != 0 ? ',' : ''}
          ${def.domain.verifyingContract || "recoverInstance.address"},
          signer
        );

        const recoveredAddress =
          await recoverInstance.recover${el.name}(
            args,
            params.signature,
            ${el.external.length != 0 ? el.external.map(ext => `${ext.name}`).join(',' + BR) : ''} ${el.external.length != 0 ? ',' : ''}
            domainSeparator
          );
          
        expect(recoveredAddress).to.be.equal(signer.address);
      });`)
    .join(BR);

export const buildVerifyPositiveTestCase = (def: IDefinition) => def.struct
    .map(el => `
    it("should verify ${el.name} signer", async () => {
      const args: ${el.name}Message = {
        ${el.props.map(prop => `${prop.name}: ${pasteDefaultStub(prop.type, def, prop)}`).join(',' + BR)}
      }

      ${el.external.length != 0 ? el.external.map(ext => `const ${ext.name} = ${pasteDefaultStub(ext.type, def, ext)};`).join(BR) : ''}

        const params = await prepare${el.name}SignedMessage(
          args,
          ${el.external.length != 0 ? el.external.map(ext => `${ext.name}`).join(',' + BR) : ''} ${el.external.length != 0 ? ',' : ''}
          ${def.domain.verifyingContract || "recoverInstance.address"},
          signer
        );

        await expect(recoverInstance.verify${el.name}(
          args,
          params.signature,
          ${el.external.length != 0 ? el.external.map(ext => `${ext.name}`).join(',' + BR) : ''} ${el.external.length != 0 ? ',' : ''}
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
        ${el.props.map(prop => `${prop.name}: ${pasteDefaultStub(prop.type, def, prop)}`).join(',' + BR)}
      }

      ${el.external.length != 0 ? el.external.map(ext => `const ${ext.name} = ${pasteDefaultStub(ext.type, def, ext)};`).join(BR) : ''}

        const params = await prepare${el.name}SignedMessage(
          args,
          ${el.external.length != 0 ? el.external.map(ext => `${ext.name}`).join(',' + BR) : ''} ${el.external.length != 0 ? ',' : ''}
          ${def.domain.verifyingContract || "recoverInstance.address"},
          intruder
        );

        await expect(recoverInstance.verify${el.name}(
          args,
          params.signature,
          ${el.external.length != 0 ? el.external.map(ext => `${ext.name}`).join(',' + BR) : ''} ${el.external.length != 0 ? ',' : ''}
          domainSeparator,
          signer.address,
          "${el.name} verification failed"
        )).to.be.revertedWith("${el.name} verification failed");
    });`)
    .join(BR);