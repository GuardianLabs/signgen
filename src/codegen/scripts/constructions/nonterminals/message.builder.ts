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
              version: "${def.domain.version}",
            },
            message,
            primaryType: "${el.name}",
            types: {
              ${el.name}: ${el.name}Type,

              ${
                el.props.concat(el.external)
                .filter(el => el.struct)
                .filter(el => !def.struct.map(el => el.name).includes(el.type))
                .filter((value, index, array) => array.indexOf(value) === index)
                .map(el => `
                ${el.type}: [{ name: "exists", type: "bool" }],`)
                .join(BR)
              }

              ${
                el.props.concat(el.external)
                .filter(el => el.struct)
                .filter(el => def.struct.map(el => el.name).includes(el.type))
                .filter((value, index, array) => array.indexOf(value) === index)
                .map(el => `
                ${el.type}: ${el.type}Type,`)
                .join(BR)
              }
            },
          };
        };
      `)
    .join(BR);