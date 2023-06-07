import { join } from "path";
import { IDefinition } from "../../../../types";
import { pasteDefaultStub } from "../../../../utils";
import { BR } from "../../terminals";

export const buildRecoverTestCase = (def: IDefinition) => def.struct
    .map(el => `
    it("should recover ${el.name} signer", async () => {
      const args: ${el.name}Message = {
        ${el.props.map(prop => `${prop.name}: ${pasteDefaultStub(prop.type, def, prop.struct)}`).join(',' + BR)}
      }

      ${el.external.length != 0 ? el.external.map(ext => `const ${ext.name} = ${pasteDefaultStub(ext.type, def, ext.struct)};`).join(BR) : ''}

        const params = await prepare${el.name}SignedMessage(
          args,
          ${el.external.length != 0 ? el.external.map(ext => `${ext.name}`).join(',' + BR) : ''} ${el.external.length != 0 ? ',' : ''}
          recoverLibInstance.address,
          signer
        );

        const recoveredAddress =
          await recoverLibInstance.recover${el.name}(
            args,
            params.signature,
            ${el.external.length != 0 ? el.external.map(ext => `${ext.name}`).join(',' + BR) : ''} ${el.external.length != 0 ? ',' : ''}
            domainSeparator
          );
        expect(recoveredAddress).to.be.equal(signer.address);
      });`)
    .join(BR);

export const buildVerifyTestCase = (def: IDefinition) => def.struct
    .map(el => `
    it("should verify ${el.name} signer", async () => {
      const args: ${el.name}Message = {
        ${el.props.map(prop => `${prop.name}: ${pasteDefaultStub(prop.type, def, prop.struct)}`).join(',' + BR)}
      }

      ${el.external.length != 0 ? el.external.map(ext => `const ${ext.name} = ${pasteDefaultStub(ext.type, def, ext.struct)};`).join(BR) : ''}

        const params = await prepare${el.name}SignedMessage(
          args,
          ${el.external.length != 0 ? el.external.map(ext => `${ext.name}`).join(',' + BR) : ''} ${el.external.length != 0 ? ',' : ''}
          recoverLibInstance.address,
          signer
        );

        const recoveryResult =
          await recoverLibInstance.verify${el.name}(
            args,
            params.signature,
            ${el.external.length != 0 ? el.external.map(ext => `${ext.name}`).join(',' + BR) : ''} ${el.external.length != 0 ? ',' : ''}
            domainSeparator,
            signer.address
          );
          
        expect(recoveryResult).to.be.equal(true);
    });`)
    .join(BR);