import { IDefinition } from "../../../../types";
import { pasteDefaultStub } from "../../../../utils";
import { BR } from "../../terminals";

export const buildRecoverTestCase = (def: IDefinition) => def.struct
    .map(el => `
    it("should recover ${el.name} signer", async () => {
      const args: ${el.name}Message = {
        ${el.props.map(prop => `${prop.name}: ${pasteDefaultStub(prop.type)}`).join(',' + BR)}
      }

      ${el.external ? el.external.map(ext => `const ${ext.name} = ${pasteDefaultStub(ext.type)};`).join(',' + BR) : ''}

        const params = await prepare${el.name}SignedMessage(
          args,
          ${el.external ? el.external.map(ext => `${ext.name}`).join(',' + BR) : ''},
          recoverLibInstance.address,
          signer
        );
        const recoveredAddress =
          await recoverLibInstance.recover${el.name}(
            params,
            ${el.external ? el.external.map(ext => `${ext.name}`).join(',' + BR) : ''} ${el.external ? ',' : ''}
            domainSeparator
          );
        expect(recoveredAddress).to.be.equal(signer.address);
      });`)
    .join(BR);

export const buildVerifyTestCase = (def: IDefinition) => def.struct
    .map(el => `
    it("should verify ${el.name} signer", async () => {
        const params = await prepare${el.name}SignedMessage(
        ${el.props.map(prop => `${prop.name}`).join(',' + BR)}
        );
        const recoveryResult =
        await recoverLibInstance.recover${el.name}(
            params,
            ${el.external ? el.external.map(ext => `${ext.name}`).join(',' + BR) : ''} ${el.external ? ',' : ''}
            domainSeparator,
            signer.address
        );
        expect(recoveryResult).to.be.equal(true);
    });`)
    .join(BR);