export default {
    domain: {
        name: 'Sample',
        version: '1',
    },

    struct: [
        {
            name: "TypeOne", 
            props: [
                { name: "structure1", type: "AStruct", struct: true },
                { name: "structure2", type: "BStruct", struct: true },
                { name: "structure3", type: "TypeTwo", struct: true },
            ],
            external: [
            ]
        },
    ],
    
    related: [
    ]
};