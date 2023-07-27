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

When config is ready there are two consumption options:
* as a package: `npx @guardian-network/signgen gen -c -s -l`
* inside a project:
    * install `pnpm`: `npm add -g pnpm`
    * `pnpm i && pnpm build && pnpm cli -c -s -l`

## Useful tips:
1. Definition must have at least one message (`def#struct.length > 0`)
1. Message must have at least one field (`def#struct#props.length > 0`)
1. Use explicit types! (`uint => uint256/128/64...`)
1. If parameter is a struct, use `struct: true` flag
1. If parameter is an enum, use `enum: true` flag
1. Use `omit: true` flag to exclude the field from the signature but keep it in the message struct
1. Do not sign too much data in one message or at least do not use lots of struct fields
    * Negative example:
        ```
        name: "Don't", 
        props: [
            { name: 'struct1', type: 'Struct', struct: true },
            { name: 'struct2', type: 'Struct', struct: true },
            { name: 'struct3', type: 'Struct', struct: true },
            { name: 'struct4', type: 'Struct', struct: true },
            { name: 'struct5', type: 'Struct', struct: true },
        ],
        external: []
        ```
1. Struct arrays are not supported yet
    * Negative example:
        ```
        name: "Don't", 
        props: [
            { name: 'struct1', type: 'Struct[]', struct: true },
        ],
        external: []
        ```
1. Avoid cyclic dependencies!
    * Negative example:
        ```
        name: "Don't", 
        props: [
            { name: 'struct1', type: 'Don't', struct: true },
        ],
        external: []
        ```
1. Structure types that are used as a parameters for a messages (in `struct` block) but are not included in the `struct` block must be defined in `related` block in the same manner as a `struct`, **except** `related` can not have `external`s
1. `props` and `external` blocks of the same Struct must not share members with the same name (cause they will end up as indistinguishable signature type fields). As far as you won't omit the conflicting one.
    * Negative example:
        ```
        name: "Don't", 
        props: [
            { name: 'num', type: 'uint256' },
        ],
        external: [
            { name: 'num', type: 'uint256' },
        ]
        ```
    * Positive example:
        ```
        name: "Do", 
        props: [
            { name: 'omitMe', type: 'uint256', omit: true },
        ],
        external: [
            { name: 'omitMe', type: 'uint256'}
        ]
        ```
1. No `external` properties should be named **`addr`** or **`domainSeparator`**; those are reserved names
    * Negative example:
        ```
        name: "Don't", 
        props: [
            { name: 'num', type: 'uint256' },
        ],
        external: [
            { name: 'addr', type: 'address' },
            { name: 'domainSeparator', type: 'bytes32' },
        ]
        ```
1. All the undefined struct types will be mocked with `{ exists: bool }`
1. All the enums will be mocked with `{ EXISTS }`
1. The given `cli -c -s -l` command and flags will automatically launch generated tests
1. Use `pnpm test:e2e` for end-to-end testing
1. Use `pnpm test:unit` for syntax unit testing
1. Generated tests-specific constraints:
    * If `salt` is not specified, it won't be included in the domain separator.
    * If `verifyingContract` is not specified, the address of the Signature Verification contract will be used in the domain separator
    as verifying contract's address.
    * If `chainId` is not specified, the chain ID of the emulator's blockchain will be used (extracted from the hardhat's `signer`). **Change before deploy**.

* Using as a project:
    1. `git clone`
    1. `cd signgen`
    1. `pnpm i`
    1. create `definition.js` file (and move it to the root of the project - near `package.json` - for default mode)
    1. execute:
        * for default mode (resulting folder: `output`): `pnpm cli -c -s -l`
        * for custom mode: `pnpm cli -c -s -l -f "{YOUR_DEFINITION_PATH}" -d "{YOUR_OUTPUT_PATH}"`

* Using as a package
    - not implemented