# EIP-712 Sigantures & Artifacts Generator

## Options:
```
  -f, --file  <path>  Data to sign type definitions file path
  -d, --dist  <path>  Destination folder
  -c, --contract      Generate contract artifacts
  -s, --script        Generate scripts artifacts
  -l, --launch        Automatically launch generated tests (if -c -s passed)
  -V, --version       output the version number
  -h, --help          display help for command
```

## Configuration file:
It is requierd to create config file `definition.js` that exports the needed types with the following structure:
```
module.exports = {
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
                { name: 'struct1', type: 'Struct', struct: true, omit: true },
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

## Usage:

When config is ready the consumption have two options:
* as a package: `npx @guardian-network/signgen gen -c -s -l`
* inside a project: `pnpm cli -c -s -l`

## Useful tips:
1. Definition must have at least one message (`def#struct.length > 0`)
1. Message must have at least one field (`def#struct#props.length > 0`)
1. Use explicit types! (`uint => uint256/128/64...`)
1. If parameter is a struct, use `struct: true` flag
1. If parameter is an enum, use `enum: true` flag
1. Use `omit: true` flag to exclude the field from the signature but keep it in the message struct.
1. Do not sign too much data in one message or at least do not use lots of struct fields.
1. Struct arrays are not supported yet
1. Avoid cyclic dependencies!
1. Structure types that are used as a parameters for a messages (in `struct` block) but are not included in the `struct` block must be defined in `related` block in the same manner as a `struct`, **except** `related` can not have `external`s
1. `props` and `external` blocks of the same Struct must not share members with the same name (cause they will end up as indistinguishable signature type fields). As far as you won't omit the conflicting one.
1. No `external` properties should be named **`addr`** or **`domainSeparator`**; those are reserved names.
1. All the undefined struct types will be mocked with `{ exists: bool }`
1. All the enums will be mocked with `{ EXISTS }`
1. `cli -c -s -l` will automatically launch generated tests
1. Use `pnpm test:e2e` for end-to-end testing
1. Use `pnpm test:unit` for syntax unit testing
