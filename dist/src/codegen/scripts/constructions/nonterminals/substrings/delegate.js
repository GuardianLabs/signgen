"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.composeObjectFields = exports.composeObjectField = exports.composeArgument = exports.composeConstantStubs = void 0;
const utils_1 = require("../../../../utils");
const terminals_1 = require("../../terminals");
const composeConstantStubs = (def) => (props) => props.map(ext => `const ${ext.name} = ${(0, utils_1.pasteDefaultStub)(ext.type, def, ext)};`).join(terminals_1.BR);
exports.composeConstantStubs = composeConstantStubs;
const composeArgument = (props) => props.map(ext => `${ext.name}`).join(',' + terminals_1.BR);
exports.composeArgument = composeArgument;
const composeObjectField = (def) => (prop) => `${prop.name}: ${(0, utils_1.pasteDefaultStub)(prop.type, def, prop)}`;
exports.composeObjectField = composeObjectField;
const composeObjectFields = (def, props) => props.map((0, exports.composeObjectField)(def)).join(',' + terminals_1.BR);
exports.composeObjectFields = composeObjectFields;
//# sourceMappingURL=delegate.js.map