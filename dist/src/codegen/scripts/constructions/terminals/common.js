"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParamType = exports.EIP712DomainType = void 0;
exports.EIP712DomainType = `
export const EIP712DomainType = [
    { name: 'name', type: 'string' },
    { name: 'version', type: 'string' },
    { name: 'chainId', type: 'uint256' },
    { name: 'verifyingContract', type: 'address' },
  ];`;
exports.ParamType = `export type PrepareParams<Y> = Omit<Y, 'verifyingContract'> & {
    signature: BytesLike;
  };`;
//# sourceMappingURL=common.js.map