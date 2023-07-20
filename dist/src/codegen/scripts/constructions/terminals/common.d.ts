export declare const EIP712DomainType = "\nexport const EIP712DomainType = [\n    { name: 'name', type: 'string' },\n    { name: 'version', type: 'string' },\n    { name: 'chainId', type: 'uint256' },\n    { name: 'verifyingContract', type: 'address' },\n  ];";
export declare const ParamType = "export type PrepareParams<Y> = Omit<Y, 'verifyingContract'> & {\n    signature: BytesLike;\n  };";
