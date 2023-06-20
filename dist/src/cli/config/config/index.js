"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class Config {
    static get(item) {
        if (!process.env[item])
            throw new Error(`No such environment variable: ${item}`);
        return process.env[item];
    }
    static getOptional(item, alt) {
        return process.env[item] || alt;
    }
    static isSet(item) {
        return process.env[item] !== undefined;
    }
}
exports.Config = Config;
//# sourceMappingURL=index.js.map