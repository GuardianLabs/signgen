"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildMessage = void 0;
const utils_1 = require("../../../utils");
const parser_1 = require("../../parser");
const terminals_1 = require("../terminals");
const buildMessage = (def) => def.struct
    .map(el => `
        export const build${el.name}Message = (
          rawMessage: ${el.name}Message,
          ${el.external.map(ext => `${ext.name}: ${(0, parser_1.inferType)(ext.type)},`).join(terminals_1.BR)}
          chainId: number,
          verifyingContract: string
        ) => {
          const message = {
            ...rawMessage,
            ${el.external.map(ext => `${ext.name},`).join(terminals_1.BR)}
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
              ${el.props.concat(el.external)
    .filter(el => el.struct)
    .filter(el => !def.struct.map(el => el.name).includes(el.type))
    .filter(el => !def.related.map(el => el.name).includes(el.type))
    .filter(utils_1.unique)
    .map(el => `
                ${el.type}: ${JSON.stringify((0, utils_1.stubUndefinedStruct)())},`)
    .join(terminals_1.BR)}

              // internal
              ${el.props.concat(el.external)
    .filter(el => el.struct)
    .filter(el => def.struct.map(el => el.name).includes(el.type))
    .filter(utils_1.unique)
    .map(el => `
                ${el.type}: ${el.type}Type,`)
    .join(terminals_1.BR)}

              // related
              ${el.props.concat(el.external)
    .filter(el => el.struct)
    .filter(el => def.related.map(el => el.name).includes(el.type))
    .filter(utils_1.unique)
    .map(el => `
                ${el.type}: ${el.type}Type,`)
    .join(terminals_1.BR)}
            },
          };
        };
      `)
    .join(terminals_1.BR);
exports.buildMessage = buildMessage;
//# sourceMappingURL=message.builder.js.map