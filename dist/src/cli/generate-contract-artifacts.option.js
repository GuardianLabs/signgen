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
exports.generateContractArtifacts = void 0;
const contracts_1 = require("../codegen/contracts");
const utils_1 = require("./utils");
const path = __importStar(require("path"));
const config_1 = require("./config");
async function generateContractArtifacts(def, outputFolder) {
    const nameSnake = def.struct.map(el => el.name).join('_');
    const nameCamel = def.struct.map(el => el.name).join('');
    const output = (0, contracts_1.build)(def, nameSnake);
    const targetFolder = path.join(outputFolder, "contracts");
    (0, utils_1.save)({
        dirPath: targetFolder,
        content: (0, utils_1.prettifySolidity)(output.recoveryLib),
        name: `${config_1.RECOVERY_LIB_FILENAME}_${nameCamel}`,
        ext: config_1.Extension.Solidity
    });
    (0, utils_1.save)({
        dirPath: targetFolder,
        content: (0, utils_1.prettifySolidity)(output.typeHashDefinitions),
        name: config_1.TYPEHASH_DEFINITIONS_FILENAME,
        ext: config_1.Extension.Solidity
    });
    (0, utils_1.save)({
        dirPath: targetFolder,
        content: (0, utils_1.prettifySolidity)(output.params),
        name: config_1.STRUCTS_FILENAME,
        ext: config_1.Extension.Solidity
    });
    (0, utils_1.save)({
        dirPath: targetFolder,
        content: (0, utils_1.prettifySolidity)(output.mayNeed),
        name: config_1.MAY_NEED_FILENAME,
        ext: config_1.Extension.Solidity
    });
    await (0, utils_1.compile)(outputFolder);
}
exports.generateContractArtifacts = generateContractArtifacts;
//# sourceMappingURL=generate-contract-artifacts.option.js.map