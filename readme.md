Usage: eip712_codegen [options]

You need to create definition.ts file that exports your needed types with the following structure:

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
                { name: 'sample2', type: 'sample' },
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
            external: []
        }
    ]
}; 

Use explicit types! (uint => uint256/128/64...)
If parameter is a struct, use "struct: true" flag

All the undefined structs will be mocked with { exists: true }
All the enums will be mocked with { EXISTS }

cli -c -s will automatically launch generated tests

EIP712 artifacts generator

Options:
  -f, --file  <path>  Data to sign type definitions file path
  -d, --dist  <path>  Destination folder
  -c, --contract      Generate contract artifacts
  -s, --script        Generate scripts artifacts
  -V, --version       output the version number
  -h, --help          display help for command