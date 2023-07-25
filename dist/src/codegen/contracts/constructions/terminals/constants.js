"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DOMAIN_TYPEHASH_WITH_SALT = exports.DOMAIN_TYPEHASH = void 0;
exports.DOMAIN_TYPEHASH = `bytes32 constant DOMAIN_TYPE_HASH = keccak256(
    "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
);`;
exports.DOMAIN_TYPEHASH_WITH_SALT = `bytes32 constant DOMAIN_TYPE_HASH = keccak256(
    "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract,bytes32 salt)"
);`;
//# sourceMappingURL=constants.js.map