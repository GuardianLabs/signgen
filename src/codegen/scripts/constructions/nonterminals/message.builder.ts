import { IDefinition, IStructProperty } from "../../../types";
import { stubUndefinedStruct, unique } from "../../../utils";
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
              ${def.domain.salt ? `salt: ${def.domain.salt}` : ""}
            },
            message,
            primaryType: "${el.name}",
            types: {
              // self
              ${el.name}: ${el.name}Type,

              // undefined
              ${
                el.props.concat(el.external)
                .filter(el => (el as IStructProperty).struct)
                .filter(el => !def.struct.map(el => el.name).includes(el.type))
                .filter(el => !def.related.map(el => el.name).includes(el.type))
                .filter(unique)
                .map(el => `
                ${el.type}: ${JSON.stringify(stubUndefinedStruct())},`)
                .join(BR)
              }

              // internal
              ${
                el.props.concat(el.external)
                .filter(el => (el as IStructProperty).struct)
                .filter(el => def.struct.map(el => el.name).includes(el.type))
                .filter(unique)
                .map(el => `
                ${el.type}: ${el.type}Type,`)
                .join(BR)
              }

              // related
              ${
                el.props.concat(el.external)
                .filter(el => (el as IStructProperty).struct)
                .filter(el => def.related.map(el => el.name).includes(el.type))
                .filter(unique)
                .map(el => `
                ${el.type}: ${el.type}Type,`)
                .join(BR)
              }
            },
          };
        };
      `)
    .join(BR);