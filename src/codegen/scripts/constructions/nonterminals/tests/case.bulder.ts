import { join } from "path";
import { IDefinition } from "../../../../types";
import { pasteDefaultStub } from "../../../../utils";
import { BR } from "../../terminals";

export const buildRecoverTestCase = (def: IDefinition) => def.struct
    .map(el => `
    it("should recover ${el.name} signer", async () => {
      const args: ${el.name}Message = {
        ${el.props.map(prop => `${prop.name}: ${pasteDefaultStub(prop.type)}`).join(',' + BR)}
      }

      ${el.external.length != 0 ? el.external.map(ext => `const ${ext.name} = ${pasteDefaultStub(ext.type)};`).join(',' + BR) : ''}

        const params = await prepare${el.name}SignedMessage(
          args,
          ${el.external.length != 0 ? el.external.map(ext => `${ext.name}`).join(',' + BR) : ''} ${el.external.length != 0 ? ',' : ''}
          recoverLibInstance.address,
          signer
        );

        const structData = ethers.utils.AbiCoder.prototype.encode(
          [${el.props.map(prop => `'${prop.type}'`).join(',')}],
          [${el.props.map(prop => `args['${prop.name}']`).join(',')}]
        );

        const recoveredAddress =
          await recoverLibInstance.recover${el.name}(
            structData,
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
        ${el.props.map(prop => `${prop.name}: ${pasteDefaultStub(prop.type)}`).join(',' + BR)}
      }

      ${el.external.length != 0 ? el.external.map(ext => `const ${ext.name} = ${pasteDefaultStub(ext.type)};`).join(',' + BR) : ''}

        const params = await prepare${el.name}SignedMessage(
          args,
          ${el.external.length != 0 ? el.external.map(ext => `${ext.name}`).join(',' + BR) : ''} ${el.external.length != 0 ? ',' : ''}
          recoverLibInstance.address,
          signer
        );

        const structData = ethers.utils.AbiCoder.prototype.encode(
          [${el.props.map(prop => `'${prop.type}'`).join(',')}],
          [${el.props.map(prop => `args['${prop.name}']`).join(',')}]
        );

        const recoveryResult =
          await recoverLibInstance.verify${el.name}(
            structData,
            params.signature,
            ${el.external.length != 0 ? el.external.map(ext => `${ext.name}`).join(',' + BR) : ''} ${el.external.length != 0 ? ',' : ''}
            domainSeparator,
            signer.address
          );
          
        expect(recoveryResult).to.be.equal(true);
    });`)
    .join(BR);