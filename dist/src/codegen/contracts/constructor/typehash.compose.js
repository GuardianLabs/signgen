"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.composeTypehash = void 0;
const nonterminals_1 = require("../constructions/nonterminals");
const terminals_1 = require("../constructions/terminals");
const composeTypehash = (def) => {
    return `
    
    ${terminals_1.UNLICENSED_LICENSE}
    ${terminals_1.SOLIDITY_19}

    ${def.domain.salt ? terminals_1.DOMAIN_TYPEHASH_WITH_SALT : terminals_1.DOMAIN_TYPEHASH}

    ${(0, nonterminals_1.buildTypeHash)(def)}

    ${(0, nonterminals_1.buildStubTypeHash)(def)}
    `;
};
exports.composeTypehash = composeTypehash;
//# sourceMappingURL=typehash.compose.js.map