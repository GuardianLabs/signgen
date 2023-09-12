export const TYPED_SIGNER_INTERFACE = `export interface TypedSigner {
    address: string;
  
    _signTypedData(
      ...params: any
    ): Promise<string>;
  
    getChainId(): Promise<number>;
}`;