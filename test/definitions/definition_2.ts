export default {
    domain: {
        name: 'Sample',
        version: '1',
    },

    struct: [
        {
            name: "TypeOne", 
            props: [
                { name: 'operation', type: 'uint256' },
                { name: 'contractAddress', type: 'address' },
                { name: 'rules', type: 'uint256[]' },
                { name: 'flag', type: 'bool' },
                // { name: 'approvers', type: 'address[]' },
                { name: 'approversGiven', type: 'uint8[]' },
                // { name: 'approvalsRequired', type: 'uint8[]' },
                { name: 'logicsList', type: 'address[]' },
                { name: 'constantsList', type: 'bytes' },
                { name: "structure1", type: "AStruct", struct: true },
                { name: "structure2", type: "BStruct", struct: true },
                { name: "structure3", type: "TypeTwo", struct: true },
                { name: "structure4", type: "TypeTwo", struct: true },
                { name: "structure5", type: "TypeTwo", struct: true },
                { name: "structure6", type: "TypeTwo", struct: true },
                { name: 'nonce', type: 'bytes32' }
            ],
            external: [
                { name: "operationId", type: "string" },
            ]
        },
        {
            name: "TypeTwo",
            props: [
                { name: 'tests', type: 'string' },
                { name: 'testEnum', type: 'Operations', enum: true },
            ],
            external: [
            ]
        }
    ],
    
    related: [
        {
            name: "BStruct",
            props: [
                { name: 'custom', type: 'string' },
            ],
            external: []
        }
    ]
};