"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = void 0;
const lib_compose_1 = require("./lib.compose");
const params_compose_1 = require("./params.compose");
const typehash_compose_1 = require("./typehash.compose");
const utils_compose_1 = require("./utils.compose");
function build(def, name) {
    return {
        recoveryLib: (0, lib_compose_1.composeLib)(def, name),
        typeHashDefinitions: (0, typehash_compose_1.composeTypehash)(def),
        params: (0, params_compose_1.composeParams)(def),
        mayNeed: (0, utils_compose_1.composeUtils)(def)
    };
}
exports.build = build;
//# sourceMappingURL=index.js.map