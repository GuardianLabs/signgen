"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.composeStructFields = exports.composeStructField = exports.composeCustomEncodeArgument = exports.composeParameters = exports.composeEncodeArgument = exports.composeArgument = void 0;
const utils_1 = require("../../../../utils");
const terminals_1 = require("../../terminals");
const composeArgument = (props) => props.map(ext => `${ext.name},`).join(terminals_1.SPACE);
exports.composeArgument = composeArgument;
const composeEncodeArgument = (def) => (props) => props.map(prop => (0, utils_1.wrapArgument)(prop.name, prop.type, def, prop)).join(`,${terminals_1.BR}`);
exports.composeEncodeArgument = composeEncodeArgument;
const composeParameters = (props) => (0, utils_1.formatSolidityParameters)(props).replace(/.$/, "");
exports.composeParameters = composeParameters;
const composeCustomEncodeArgument = (props) => props.map(ext => `${ext.name}`).join(',' + terminals_1.SPACE);
exports.composeCustomEncodeArgument = composeCustomEncodeArgument;
const composeStructField = (prop) => `${prop.type} ${prop.name};`;
exports.composeStructField = composeStructField;
const composeStructFields = (props) => props.map(exports.composeStructField).join(terminals_1.BR + terminals_1.TAB);
exports.composeStructFields = composeStructFields;
//# sourceMappingURL=delegate.js.map