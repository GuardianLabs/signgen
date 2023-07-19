import { IDefinition, IStructProperty } from "../../../types";
import { optionalComma, stubUndefinedStruct, unique, uniquePropertyWise } from "../../../utils";
import { inferType } from "../../parser";
import { BR } from "../terminals";

export const buildMessage = (def: IDefinition) => def.struct
    .map(el => 
        `
        export const build${el.name}Message = (
          rawMessage: ${el.name}Message,
          ${el.external.filter(prop => !prop.omit).map(ext => `${ext.name}: ${inferType(ext.type)},`).join(BR)}
          chainId: number,
          verifyingContract: string
        ) => {

          const omittedMessage = (({ ${el.props.filter(prop => !!prop.omit).map(om => om.name).join(',')} ${optionalComma(el.props.filter(prop => !!prop.omit))} ...o }) => o)(rawMessage);
          const message = {
            ...omittedMessage,
            ${el.external.filter(prop => !prop.omit).map(ext => `${ext.name},`).join(BR)}
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
                el.props.concat(el.external).filter(prop => !prop.omit)
                .filter(el => (el as IStructProperty).struct)
                .filter(el => !def.struct.map(el => el.name).includes(el.type))
                .filter(el => !def.related.map(el => el.name).includes(el.type))
                .filter(unique)
                .filter(uniquePropertyWise('type'))
                .map(el => `
                ${el.type}: ${JSON.stringify(stubUndefinedStruct())},`)
                .join(BR)
              }

              // internal & related
              ${
                el.props.concat(el.external).filter(prop => !prop.omit)
                .filter(p => (p as IStructProperty).struct)
                .filter(p => def.struct.map(p => p.name).includes(p.type) || def.related.map(p => p.name).includes(p.type))
                .filter(unique)
                .filter(uniquePropertyWise('type'))
                .map(p => `
                ${p.type}: ${p.type}Type,`)
                .join(BR)
              }
            },
          };
        };
      `)
    .join(BR);