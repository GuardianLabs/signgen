import { IDefinition, IEnumProperty } from "../../../types";
import { optionalComma } from "../../../utils";
import { inferType } from "../../parser";
import { BR } from "../terminals";

export const buildMessageType = (def: IDefinition) => def.struct
    .map(el => `
    export type ${el.name}Message = {
        ${el.props.map(prop => `${prop.name}: ${inferType(prop.type)};`).join(BR)} 
      };
    `)
    .join(BR);

export const buildEIP712MessageTypes = (def: IDefinition) => def.struct.concat(def.related)
      .map(el => `
      export const ${el.name}Type = [
        ${el.props.map(prop => `{ name: '${prop.name}', type: '${(prop as IEnumProperty).enum ? "uint8" : prop.type}' }`).join(',' + BR)} ${optionalComma(el.external)}
        ${el.external.map(ext => `{ name: '${ext.name}', type: '${(ext as IEnumProperty).enum ? "uint8" : ext.type}' }`).join(',' + BR)}
      ];
      `)
    .join(BR);