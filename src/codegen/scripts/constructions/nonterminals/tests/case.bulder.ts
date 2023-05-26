import { IDefinition } from "../../../../types";
import { BR } from "../../terminals";

// todo: stub params by type
export const buildRecoverTestCase = (def: IDefinition) => def.struct
    .map(el => `
    it("should recover ${el.name} signer", async () => {
        const params = await prepare${el.name}Params(
          ${el.props.map(prop => `${prop.name}`).join(',' + BR)}
        );
        const recoveredAddress =
          await LIB.recover${el.name}(
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
        const params = await prepare${el.name}Params(
        ${el.props.map(prop => `${prop.name}`).join(',' + BR)}
        );
        const recoveryResult =
        await LIB.recover${el.name}(
            params,
            ${el.external ? el.external.map(ext => `${ext.name}`).join(',' + BR) : ''} ${el.external ? ',' : ''}
            domainSeparator,
            signer.address
        );
        expect(recoveryResult).to.be.equal(true);
    });`)
    .join(BR);