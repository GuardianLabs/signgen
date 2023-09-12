
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
                { name: 'operation', type: 'uint256' },
            ],
            external: [
            ]
        },
    ],
    
    related: [
    ]
};

export default def;