export default {
    domain: {
        name: 'Sample',
        version: '1',
    },

    struct: [
        {
            name: "TypeOne", 
            props: [
                { name: 'addr', type: 'address' }
            ],
            external: [
                // { name: "operationId", type: "string" },
                //{ name: "structure", type: "TypeTwo", struct: true },
            ]
        },
        // {
        //     name: "TypeTwo",
        //     props: [
        //         { name: 'tests', type: 'string' },
        //     ]
        // }
    ]
};