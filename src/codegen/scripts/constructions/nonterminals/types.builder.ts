import { IDefinition } from "../../../types";
import { inferType } from "../../parser";
import { BR } from "../terminals";

// todo: cast Solidity types to TypeScript
export const buildMessageType = (def: IDefinition) => def.struct
    .map(el => `
    export type ${el.name}Message = {
        ${el.props.map(prop => `${prop.name}: ${inferType(prop.type)};`).join(BR)} 
      };
    `)
    .join(BR);

export const buildEIP712MessageTypes = (def: IDefinition) => def.struct
      .map(el => `
      export const ${el.name}Type = [
        ${el.props.map(prop => `{ name: '${prop.name}', type: '${prop.type}' }`).join(',' + BR)}
      ];
      `)
    .join(BR);

export const buildAdditionalTypes = (def: IDefinition) => def.struct
      .map(el => `
      export type ${el.name}Params = PrepareParams<${el.name}Message>;
      `)
    .join(BR);