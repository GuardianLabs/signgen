"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.composeTests = void 0;
const nonterminals_1 = require("../constructions/nonterminals");
const composeTests = (def) => {
    return `

    ${(0, nonterminals_1.buildTestSuite)(def)}
    `;
};
exports.composeTests = composeTests;
//# sourceMappingURL=tests.compose.js.map