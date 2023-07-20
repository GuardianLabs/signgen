"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniquePropertyWise = exports.unique = void 0;
const unique = (value, index, array) => array.indexOf(value) === index;
exports.unique = unique;
const uniquePropertyWise = (property) => (value, index, array) => index === array.findIndex((el) => (el[property] == value[property]));
exports.uniquePropertyWise = uniquePropertyWise;
//# sourceMappingURL=filters.js.map