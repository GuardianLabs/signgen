import { IDefinition } from "../../../types";
import { BR } from "../terminals";

export const buildSignature = (def: IDefinition) => def.struct
    .map(el => `
    export const make${el.name}Signature = async (
        rawMessage: ${el.name}Message,
        signer: SignerWithAddress,
      ): Promise<string> => {
        const chainId = await signer.getChainId();
        const { domain, types, message, primaryType } = build${el.name}Message(
          rawMessage,
          chainId,
        );
        return signer.signTypedDataV4(domain, types, message, primaryType);
      };`)
    .join(BR);