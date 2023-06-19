"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateScriptArtifacts = void 0;
const utils_1 = require("./utils");
const path = __importStar(require("path"));
const scripts_1 = require("../codegen/scripts");
const config_1 = require("./config");
async function generateScriptArtifacts(def, outputFolder) {
    const nameSnake = def.struct.map(el => el.name).join('_');
    const nameCamel = def.struct.map(el => el.name).join('');
    const output = (0, scripts_1.build)(def, nameSnake);
    const targetFolder = path.join(outputFolder, "tests");
    (0, utils_1.save)({
        dirPath: targetFolder,
        content: (0, utils_1.prettifyTypescript)(output.tests),
        name: `${nameCamel}_recovery.spec`,
        ext: config_1.Extension.Typescript
    });
    (0, utils_1.save)({
        dirPath: targetFolder,
        content: (0, utils_1.prettifyTypescript)(output.types),
        name: config_1.TYPES_FILENAME,
        ext: config_1.Extension.Typescript
    });
    (0, utils_1.save)({
        dirPath: targetFolder,
        content: (0, utils_1.prettifyTypescript)(output.utils),
        name: `${nameCamel}.utils`,
        ext: config_1.Extension.Typescript
    });
}
exports.generateScriptArtifacts = generateScriptArtifacts;
//# sourceMappingURL=generate-script-artifacts.option.js.map