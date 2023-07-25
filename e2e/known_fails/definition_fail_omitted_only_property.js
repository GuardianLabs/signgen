module.exports =  {
    domain: {
        name: 'Sample',
        version: '1',
    },

    struct: [
        {
            name: "TypeOne", 
            props: [
                { name: 'operation', type: 'uint256', omit: true },
            ],
            external: [
            ]
        },
    ],
    
    related: [
    ]
};