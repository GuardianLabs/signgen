import { IDefinition } from "../../../../types";

export const buildBeforeStatement = (def: IDefinition) => {

    return `
    before(async () => {
        const [
          signer
        ] = await ethers.getSigners();

        const VaultContract = await ethers.getContractFactory("Vault");
    
        
        domainSeparator = await recoverableInstance.buildDomainSeparator(
          getDomainName(),
          '1',
          recoverableInstance.address,
        );
      });`;
}