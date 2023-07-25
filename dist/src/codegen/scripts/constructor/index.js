"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = void 0;
const tests_compose_1 = require("./tests.compose");
const types_compose_1 = require("./types.compose");
const utils_compose_1 = require("./utils.compose");
function build(def, name) {
    return {
        tests: (0, tests_compose_1.composeTests)(def),
        types: (0, types_compose_1.composeTypes)(def),
        utils: (0, utils_compose_1.composeUtils)(def)
    };
}
exports.build = build;
//# sourceMappingURL=index.js.map