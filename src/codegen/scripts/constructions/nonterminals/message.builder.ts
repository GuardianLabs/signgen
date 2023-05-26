import { IDefinition } from "../../../types";
import { BR } from "../terminals";

// todo: deal with external parameters
export const buildMessage = (def: IDefinition) => def.struct
    .map(el => 
        `
    export const build${el.name}Message = (
        rawMessage: ${el.name}Message,
        chainId: number,
      ) => {
        const { verifyingContract, ...partialMessage } = rawMessage;
        const message = {
          ...partialMessage,
          ${el.external ? el.external.map(ext => `${ext.name}: '',`).join(BR) : ''}
        };
        return {
          domain: {
            chainId,
            name: "${def.domain.name}",
            verifyingContract,
            version: ${def.domain.version},
          },
          message,
          primaryType: "${el.name}",
          types: {
            ${el.name}: ${el.name}Type,
            EIP712Domain: EIP712DomainType,
          },
        };
      };
      `)
    .join(BR);

export const buildSignedMessage = (def: IDefinition) => def.struct
      .map(el => `
      export const prepare${el.name}Message = async (
        rawMessage: ${el.name}Message,
        signer: SignerWithAddress,
      ): Promise<${el.name}Params> => {
        const signature = await make${el.name}Signature(rawMessage, signer);
      
        return {
          ...rawMessage,
          signature,
        };
      };
      `)
    .join(BR);