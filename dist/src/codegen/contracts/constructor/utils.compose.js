"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.composeUtils = void 0;
const terminals_1 = require("../constructions/terminals");
const composeUtils = (def) => {
    return `

    ${terminals_1.UNLICENSED_LICENSE}
    ${terminals_1.SOLIDITY_19}
    
    ${terminals_1.ERC1271}
    `;
};
exports.composeUtils = composeUtils;
//# sourceMappingURL=utils.compose.js.map