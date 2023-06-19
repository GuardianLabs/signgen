"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDefinition = exports.isValidDefinition = void 0;
const utils_1 = require("../../codegen/utils");
const isValidDefinition = (def) => {
    if (def.struct.length == 0) {
        return [false, "Empty message definitions are not allowed"];
    }
    if (def.struct.map(message => message.props.length).some(len => len == 0)) {
        return [false, "Messages with no fields are not allowed"];
    }
    const uniqueArr = def.struct
        .filter((0, utils_1.uniquePropertyWise)('name'));
    if (uniqueArr.length != def.struct.length)
        return [false, "Message types duplicate by name"];
    return [true, ''];
};
exports.isValidDefinition = isValidDefinition;
const validateDefinition = (def) => {
    const [success, err] = (0, exports.isValidDefinition)(def);
    if (!success)
        throw new Error(`Definition is invalid: ${err}`);
};
exports.validateDefinition = validateDefinition;
//# sourceMappingURL=validation.js.map