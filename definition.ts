export default {
    domain: {
        name: 'Sample',
        version: '1',
    },

    struct: [
        {
            name: "TypeOne", 
            props: [
                { name: 'operation', type: 'uint8' },
                { name: 'verifyingContract', type: 'address' },
                { name: 'rules', type: 'uint256[]' },
                { name: 'approvers', type: 'address[]' },
                { name: 'approversGiven', type: 'uint8[]' },
                { name: 'approvalsRequired', type: 'uint8[]' },
                { name: 'logicsList', type: 'address[]' },
                { name: 'constantsList', type: 'bytes' },
                { name: 'nonce', type: 'bytes32' },
            ]
        },
        {
            name: "TypeTwo",
            props: [
                { name: 'tests', type: 'string' },
            ]
        }
    ]
};