Usage: eip712_codegen [options]

You need to create definition.ts file that exports your needed types with the following structure:

```
{
    domain: {
        name: 'Sample',
        version: '1',
        chainId?
        verifyingContract?
        salt?
    },

    struct: [
        {
            name: "TypeOne", 
            props: [
                { name: 'sample1', type: 'sample' },
                { name: 'sample2', type: 'RelatedStruct', struct: true },
                { name: 'struct1', type: 'Struct', struct: true },
            ],
            external: [
                { name: 'sample1', type: 'sample' },
            ]
        },
        {
            name: "TypeTwo",
            props: [
                { name: 'sample1', type: 'sample' },
                { name: 'sample2', type: 'TypeOne' },
            ],
            external: [
                { name: 'enumerable', type: 'Mocks', enum: true },
            ]
        }
    ],

    related: [
        {
            name: "RelatedStruct",
            props: [
                { name: 'sample1', type: 'sample' },
            ],
            external: [
                
            ]
        }
    ]
}; 
```

Definition must have at least one message (def#struct.length > 0)
Message must have at least one field (def#struct#props.length > 0)

Use explicit types! (uint => uint256/128/64...)

If parameter is a struct, use "struct: true" flag
If parameter is an enum, use "enum: true" flag

Do not sign too much data in one message or at least do not use lots of struct fields.

Struct arrays are not supported yet.

Avoid cyclic dependencies!

Structure types that are used as a parameters for a messages (in "struct" block) but are not included in the "struct" block must be defined in "related block" in the same manner as a "struct".
All the undefined struct types will be mocked with { exists: bool }

All the enums will be mocked with { EXISTS }

cli -c -s will automatically launch generated tests

```pnpm test:e2e``` for end-to-end testing
```pnpm test:unit``` for syntax unit testing

EIP712 artifacts generator

Options:
  -f, --file  <path>  Data to sign type definitions file path
  -d, --dist  <path>  Destination folder
  -c, --contract      Generate contract artifacts
  -s, --script        Generate scripts artifacts
  -V, --version       output the version number
  -h, --help          display help for command