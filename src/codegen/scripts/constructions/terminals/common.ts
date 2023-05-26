export const EIP712DomainType = `
export const EIP712DomainType = [
    { name: 'name', type: 'string' },
    { name: 'version', type: 'string' },
    { name: 'chainId', type: 'uint256' },
    { name: 'verifyingContract', type: 'address' },
  ];`;

export const ParamType = `export type PrepareParams<Y> = Omit<Y, 'verifyingContract'> & {
    signature: BytesLike;
  };`;