export const ERC1271 = `
abstract contract ERC1271Contract {
    /**
     * @dev Should return whether the signature provided is valid for the provided hash
     * @param _hash      Hash of the data to be signed
     * @param _signature Signature byte array associated with _hash
     *
     * MUST return the bytes4 magic value 0x1626ba7e when function passes.
     * MUST NOT modify state (using STATICCALL for solc < 0.5, view modifier for solc > 0.5)
     * MUST allow external calls
     */ 
    function isValidSignature(
      bytes32 _hash, 
      bytes memory _signature)
      public
      view 
      virtual
      returns (bytes4 magicValue);
    }
`;
