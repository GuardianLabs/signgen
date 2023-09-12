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
            ],
            external: [
            ]
        },
    ],
    
    related: [
    ]
};

export default def;