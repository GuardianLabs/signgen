"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildEIP712MessageTypes = exports.buildMessageType = void 0;
const utils_1 = require("../../../utils");
const parser_1 = require("../../parser");
const terminals_1 = require("../terminals");
const buildMessageType = (def) => def.struct
    .map(el => `
    export type ${el.name}Message = {
        ${el.props.map(prop => `${prop.name}: ${(0, parser_1.inferType)(prop.type)};`).join(terminals_1.BR)} 
      };
    `)
    .join(terminals_1.BR);
exports.buildMessageType = buildMessageType;
const buildEIP712MessageTypes = (def) => def.struct.concat(def.related)
    .map(el => `
      export const ${el.name}Type = [
        ${el.props.map(prop => `{ name: '${prop.name}', type: '${prop.enum ? "uint8" : prop.type}' }`).join(',' + terminals_1.BR)} ${(0, utils_1.optionalComma)(el.external)}
        ${el.external.map(ext => `{ name: '${ext.name}', type: '${ext.enum ? "uint8" : ext.type}' }`).join(',' + terminals_1.BR)}
      ];
      `)
    .join(terminals_1.BR);
exports.buildEIP712MessageTypes = buildEIP712MessageTypes;
//# sourceMappingURL=types.builder.js.map