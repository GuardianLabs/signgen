import { IDefinition } from "../../../types";
import { inferType } from "../../parser";
import { BR } from "../terminals";

export const buildMessage = (def: IDefinition) => def.struct
    .map(el => 
        `
        export const build${el.name}Message = (
          rawMessage: ${el.name}Message,
          ${el.external.map(ext => `${ext.name}: ${inferType(ext.type)},`).join(BR)}
          chainId: number,
          verifyingContract: string
        ) => {
          const message = {
            ...rawMessage,
            ${el.external.map(ext => `${ext.name},`).join(BR)}
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
              TypeOne: ${el.name}Type,
              EIP712Domain: EIP712DomainType,
            },
          };
        };
      `)
    .join(BR);