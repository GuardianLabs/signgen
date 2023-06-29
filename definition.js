module.exports =  {
    domain: {
        name: 'Enforcement',
        version: '1',
    },

    // uint256 nonce;
    // bytes originSig;
    // bytes data;
    // bytes32 sourceIdHash;
    // string destination;
    // uint256 amount;
    // bytes32 hashA;
    // bytes32 hashB;
    // bytes32 mandatoryTagHashed;

    struct: [
        {
            name: "PreCheckTx",
            props: [
                { name: 'nonce', type: 'uint256' },
                { name: 'data', type: 'bytes' },
                { name: 'sourceIdHash', type: 'bytes32' },
                { name: 'destination', type: 'string' },
                { name: 'amount', type: 'uint256' },
                { name: 'hashA', type: 'bytes32' },
                { name: 'hashB', type: 'bytes32' },
                { name: 'mandatoryTagHashed', type: 'bytes32' },
            ],
            external: [
              { name: 'actionCode', type: 'uint8' },
              { name: 'assetAddress', type: 'address' },
            ]
        },
    ],

    related: [
    ]
};
