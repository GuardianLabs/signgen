import { IDefinition } from "../../../../types";

export const buildBeforeStatement = (def: IDefinition) => {

    return `
    before(async () => {
        const [
          signer
        ] = await ethers.getSigners();
    
        
        domainSeparator = await recoverableInstance.buildDomainSeparator(
          getDomainName(),
          '1',
          recoverableInstance.address,
        );
      });`;
}