import { IDefinition } from "../../src/codegen/types";

const def: IDefinition = {
    domain: {
        name: 'Sample',
        version: '1',
    },

    struct: [
        {
            name: "TypeOne", 
            props: [
                { name: 'struct1', type: 'BStruct', struct: true, omit: true },
                { name: 'struct2', type: 'CStruct', struct: true, omit: true },
                { name: 'struct3', type: 'DStruct', struct: true },
            ],
            external: [
                { name: 'struct4', type: 'BStruct', struct: true },
                { name: 'struct5', type: 'CStruct', struct: true, omit: true },
                { name: 'struct6', type: 'DStruct', struct: true },
            ]
        },
    ],
    
    related: [
        {
            name: "BStruct",
            props: [
                { name: 'custom', type: 'string' },
            ],
            external: [
            ]
        },
        {
            name: "CStruct",
            props: [
                { name: 'custom', type: 'string' },
            ],
            external: [
            ]
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

export default def;