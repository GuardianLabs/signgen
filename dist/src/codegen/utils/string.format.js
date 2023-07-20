"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionalString = exports.optionalComma = exports.formatSolidityParameters = exports.formatCapitalSnake = void 0;
const terminals_1 = require("../contracts/constructions/terminals");
const formatCapitalSnake = (str) => str
    .split(/(?=[A-Z])/)
    .map(el => el.toUpperCase())
    .join("_");
exports.formatCapitalSnake = formatCapitalSnake;
const formatSolidityParameters = (props) => props
    .map(prop => dynamicAllocTypes.some(el => prop.type.includes(el)) || prop.type == "bytes" || prop.struct ?
    `${prop.type} calldata ${prop.name},` : `${prop.type} ${prop.name},`)
    .join(terminals_1.BR + terminals_1.TAB);
exports.formatSolidityParameters = formatSolidityParameters;
const dynamicAllocTypes = ["string", "[]"];
const optionalComma = (props) => `${(props === null || props === void 0 ? void 0 : props.length) != 0 ? "," : ''}`;
exports.optionalComma = optionalComma;
const optionalString = (props, delegate) => `${(props === null || props === void 0 ? void 0 : props.length) != 0 ? delegate(props) : ''}`;
exports.optionalString = optionalString;
//# sourceMappingURL=string.format.js.map