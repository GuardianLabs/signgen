"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inferType = void 0;
const parseEvmTypes_1 = require("./parseEvmTypes");
const types_1 = require("./types");
const inferType = (solidityType) => (0, types_1.generateInputType)({
    returnResultObject: false,
    useStructs: true
}, (0, parseEvmTypes_1.parseEvmType)(solidityType));
exports.inferType = inferType;
//# sourceMappingURL=index.js.map