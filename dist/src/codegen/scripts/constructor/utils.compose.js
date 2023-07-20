"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.composeUtils = void 0;
const nonterminals_1 = require("../constructions/nonterminals");
const composeUtils = (def) => {
    return `
    import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/src/signers";
    import { ${def.struct.map(el => `${el.name}Message, ${el.name}Type`).join(', ')}, EIP712DomainType, ${def.related.map(el => `${el.name}Type`).join(', ')} } from "./message.types";

    ${(0, nonterminals_1.buildMessage)(def)}

    ${(0, nonterminals_1.buildSignedMessage)(def)}
    `;
};
exports.composeUtils = composeUtils;
//# sourceMappingURL=utils.compose.js.map