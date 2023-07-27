import { IDefinition } from "../../../types";
import { inferType } from "../../parser";
import { BR } from "../terminals";

export const buildSignedMessage = (def: IDefinition) =>
  def.struct
    .map(
      (el) => `
    export const prepare${el.name}SignedMessage = async (
      struct: ${el.name}Message,
      ${el.external
        .filter((prop) => !prop.omit)
        .map((ext) => `${ext.name}: ${inferType(ext.type)},`)
        .join(BR)}
      verifyingContract: string,
      signer: SignerWithAddress
    ) => {
    
      const chainId = ${def.domain.chainId || "await signer.getChainId()"};
      const { domain, types, message } = build${el.name}Message(
        struct,
        ${el.external
          .filter((prop) => !prop.omit)
          .map((ext) => `${ext.name},`)
          .join(BR)}
        chainId,
        verifyingContract,
      );
    
      const signature = await signer._signTypedData(domain, types, message);
    
      return {
        message: struct,
        signature,
      };
    }`
    )
    .join(BR);
