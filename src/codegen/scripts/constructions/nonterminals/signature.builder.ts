import { IDefinition } from "../../../types";
import { inferType } from "../../parser";
import { BR } from "../terminals";

export const buildSignedMessage = (def: IDefinition) => def.struct
    .map(el => `
    export const prepare${el.name}SignedMessage = async (
      struct: ${el.name}Message,
      ${el.external.map(ext => `${ext.name}: ${inferType(ext.type)},`).join(BR)}
      verifyingContract: string,
      signer: SignerWithAddress
    ) => {
    
      const chainId = await signer.getChainId();
      const { domain, types, message, primaryType } = build${el.name}Message(
        struct,
        ${el.external.map(ext => `${ext.name},`).join(BR)}
        chainId,
        verifyingContract,
      );
    
      const signature = await signer._signTypedData(domain, types, message, primaryType);
    
      return {
        struct,
        signature,
      };
    }`)
  .join(BR);