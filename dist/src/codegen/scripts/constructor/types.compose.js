"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.composeTypes = void 0;
const nonterminals_1 = require("../constructions/nonterminals");
const terminals_1 = require("../constructions/terminals");
const composeTypes = (def) => {
    return `
    import { BytesLike, BigNumberish } from 'ethers';

    ${(0, nonterminals_1.buildMessageType)(def)}

    ${(0, nonterminals_1.buildEIP712MessageTypes)(def)}

    ${terminals_1.ParamType}

    ${terminals_1.EIP712DomainType}
    `;
};
exports.composeTypes = composeTypes;
//# sourceMappingURL=types.compose.js.map