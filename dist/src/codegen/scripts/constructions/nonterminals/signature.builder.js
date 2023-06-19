"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildSignedMessage = void 0;
const parser_1 = require("../../parser");
const terminals_1 = require("../terminals");
const buildSignedMessage = (def) => def.struct
    .map(el => `
    export const prepare${el.name}SignedMessage = async (
      struct: ${el.name}Message,
      ${el.external.map(ext => `${ext.name}: ${(0, parser_1.inferType)(ext.type)},`).join(terminals_1.BR)}
      verifyingContract: string,
      signer: SignerWithAddress
    ) => {
    
      const chainId = ${def.domain.chainId || "await signer.getChainId()"};
      const { domain, types, message } = build${el.name}Message(
        struct,
        ${el.external.map(ext => `${ext.name},`).join(terminals_1.BR)}
        chainId,
        verifyingContract,
      );
    
      const signature = await signer._signTypedData(domain, types, message);
    
      return {
        message: struct,
        signature,
      };
    }`)
    .join(terminals_1.BR);
exports.buildSignedMessage = buildSignedMessage;
//# sourceMappingURL=signature.builder.js.map