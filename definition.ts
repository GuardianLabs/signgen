export default {
    domain: {
        name: 'Sample',
        version: '1',
    },

    struct: [
        {
            name: "TypeOne", 
            props: [
                // { name: 'operation', type: 'uint8' },
                // { name: 'stackParam1', type: 'uint8' },
                // { name: 'stackParam2', type: 'uint8' },
                // { name: 'stackParam3', type: 'uint8' },
                // { name: 'contractAddress', type: 'address' },
                // { name: 'rules', type: 'uint256[]' },
                { name: 'approvers', type: 'address[]' },
                // { name: 'approversGiven', type: 'uint8[]' },
                // { name: 'approvalsRequired', type: 'uint8[]' },
                // { name: 'logicsList', type: 'address[]' },
                // { name: 'constantsList', type: 'bytes' },
                { name: "structure1", type: "AStruct", struct: true },
                { name: "structure2", type: "BStruct", struct: true },
                //{ name: 'nonce', type: 'bytes32' }
            ],
            external: [
                { name: "operationId", type: "string" },
                { name: "structure", type: "TypeTwo", struct: true },
            ]
        },
        {
            name: "TypeTwo",
            props: [
                { name: 'tests', type: 'string' },
            ],
            external: [
                
            ]
        }
    ]
};