"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.composeParams = void 0;
const nonterminals_1 = require("../constructions/nonterminals");
const terminals_1 = require("../constructions/terminals");
const composeParams = (def) => {
    return `
    
    ${terminals_1.UNLICENSED_LICENSE}
    ${terminals_1.SOLIDITY_19}

    ${(0, nonterminals_1.buildEnumStubs)(def)}
    
    ${(0, nonterminals_1.buildStruct)(def)}

    ${(0, nonterminals_1.buildSignedStruct)(def)}

    ${(0, nonterminals_1.buildRelatedStruct)(def)}

    ${(0, nonterminals_1.buildStructStubs)(def)}
    `;
};
exports.composeParams = composeParams;
//# sourceMappingURL=params.compose.js.map