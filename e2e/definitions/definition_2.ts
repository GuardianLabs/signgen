export default {
    domain: {
        name: 'Sample',
        version: '1',
    },

    struct: [
        {
            name: "TypeOne", 
            props: [
                { name: 'sample', type: 'uint256' },
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
                { name: 'struct1', type: 'BStruct', struct: true },
                { name: 'struct2', type: 'CStruct', struct: true },
                { name: 'struct3', type: 'DStruct', struct: true },
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
        },
        {
            name: "CStruct",
            props: [
                { name: 'custom', type: 'string' },
            ],
            external: []
        },
        {
            name: "DStruct",
            props: [
                { name: 'custom', type: 'string' },
            ],
            external: []
        }
    ]
};