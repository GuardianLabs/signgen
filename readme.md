<<<<<<< HEAD
# EIP-712 Signatures & Artifacts Generator
=======
# EIP-712 Sigantures & Artifacts Generator
>>>>>>> dev

**Notice:** it's a *beta* version, drastic improvement may take place.

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
It is required to create config file `definition.js` that exports the needed types with the following structure:
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
                { name: 'sample0', type: 'uint256' },
                { name: 'struct1', type: 'Struct', struct: true, omit: true },
            ],
            external: [
                { name: 'sample3', type: 'uint256' },
            ]
        },
        {
            name: "TypeTwo",
            props: [
                { name: 'sample1', type: 'uint256' },
                { name: 'sample4', type: 'TypeOneWithoutExternalsAndStructs', struct: true },
            ],
            external: [
                { name: 'enumerable', type: 'Mocks', enum: true },
                { name: 'sample2', type: 'RelatedStruct', struct: true }
            ]
        }
    ],
    related: [
        {
            name: "RelatedStruct",
            props: [
                { name: 'sample5', type: 'uint256' },
            ],
            external: []
        },
        {
            name: "TypeOneWithoutExternalsAndStructs", 
            props: [
                { name: 'sample0', type: 'uint256' },
            ],
            external: []
        },
    ]
};
```

## Usage:

When config is ready there are two consumption options:
* as a package: `npx @guardian-network/signgen gen -c -s -l` *(not implemented)*
* inside a project:
    * install `pnpm`: `npm add -g pnpm`
    * `git clone`
    * `cd signgen`
    * `pnpm i`
    * move the `definition.js` file to the root of the project - near `package.json` - for default mode
    * execute:
        * for default mode (resulting folder: `output`): `pnpm cli -c -s -l`
        * for custom mode: `pnpm cli -c -s -l -f "{YOUR_DEFINITION_PATH}" -d "{YOUR_OUTPUT_PATH}"`

## Useful tips:
1. Definition must have at least one message (`def#struct.length > 0`)
1. Message must have at least one field (`def#struct#props.length > 0`)
1. Use explicit types! (`uint => uint256/128/64...`)
1. If parameter is a struct, use `struct: true` flag
1. If parameter is an enum, use `enum: true` flag
1. Use `omit: true` flag to exclude the field from the signature but keep it in the message struct (**use it only for message struct members - #props**)
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
1. Now the nesting level maximum is limited to **2**. It means that if a StructA has a property of type StructB and the StructB has a field of a related type StructC, the StructC **won't be resolved** in EIP-712 type definitions.
    * Negative example:
        ```
        struct: [
            {
                name: "TypeOne", 
                props: [
                    { name: 'sample2', type: 'RelatedStruct', struct: true },
                ],
                external: []
            },
            {
                name: "TypeTwo",
                props: [
                    { name: 'sample4', type: 'TypeOne', struct: true },
                ],
                external: []
            }
        ],
        related: [
            {
                name: "RelatedStruct",
                props: [
                    { name: 'sample5', type: 'uint256' },
                ],
                external: []
            }
        ]
        ```
1. Structure types that are used as a parameters for a messages (in `struct` block) but are not included in the `struct` block must be defined in `related` block in the same manner as a `struct`, **except** `related` can not have `external`s
1. If you want to reuse Struct that is defined in `struct` block, redefine it in `related` block **without externals**
1. `related` struct must not have `struct: true` fields (for now)
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
1. Use `pnpm test:prune` to generate output deleting previous output folder (for quick definition changing and regenerating). 
1. Generated tests-specific constraints:
    * If `salt` is not specified, it won't be included in the domain separator.
    * If `verifyingContract` is not specified, the address of the Signature Verification contract will be used in the domain separator
    as verifying contract's address.
    * If `chainId` is not specified, the chain ID of the emulator's blockchain will be used (extracted from the hardhat's `signer`). **Change before deploy**