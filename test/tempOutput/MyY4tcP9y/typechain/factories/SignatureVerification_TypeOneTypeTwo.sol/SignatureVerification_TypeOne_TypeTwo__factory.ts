/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  SignatureVerification_TypeOne_TypeTwo,
  SignatureVerification_TypeOne_TypeTwoInterface,
} from "../../SignatureVerification_TypeOneTypeTwo.sol/SignatureVerification_TypeOne_TypeTwo";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "domainName",
        type: "string",
      },
      {
        internalType: "string",
        name: "version",
        type: "string",
      },
      {
        internalType: "address",
        name: "verifyingContract",
        type: "address",
      },
    ],
    name: "buildDomainSeparator",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "operation",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "contractAddress",
            type: "address",
          },
          {
            internalType: "uint256[]",
            name: "rules",
            type: "uint256[]",
          },
          {
            internalType: "bool",
            name: "flag",
            type: "bool",
          },
          {
            internalType: "uint8[]",
            name: "approversGiven",
            type: "uint8[]",
          },
          {
            internalType: "address[]",
            name: "logicsList",
            type: "address[]",
          },
          {
            internalType: "bytes",
            name: "constantsList",
            type: "bytes",
          },
          {
            components: [
              {
                internalType: "bool",
                name: "exists",
                type: "bool",
              },
            ],
            internalType: "struct AStruct",
            name: "structure1",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "string",
                name: "custom",
                type: "string",
              },
            ],
            internalType: "struct BStruct",
            name: "structure2",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "string",
                name: "tests",
                type: "string",
              },
              {
                internalType: "enum Operations",
                name: "testEnum",
                type: "uint8",
              },
            ],
            internalType: "struct TypeTwo",
            name: "structure3",
            type: "tuple",
          },
          {
            internalType: "bytes32",
            name: "nonce",
            type: "bytes32",
          },
        ],
        internalType: "struct TypeOne",
        name: "message",
        type: "tuple",
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
      {
        internalType: "string",
        name: "operationId",
        type: "string",
      },
      {
        internalType: "bytes32",
        name: "domainSeparator",
        type: "bytes32",
      },
    ],
    name: "recoverTypeOne",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "string",
            name: "tests",
            type: "string",
          },
          {
            internalType: "enum Operations",
            name: "testEnum",
            type: "uint8",
          },
        ],
        internalType: "struct TypeTwo",
        name: "message",
        type: "tuple",
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
      {
        components: [
          {
            internalType: "string",
            name: "tests",
            type: "string",
          },
          {
            internalType: "enum Operations",
            name: "testEnum",
            type: "uint8",
          },
        ],
        internalType: "struct TypeTwo",
        name: "structure3",
        type: "tuple",
      },
      {
        internalType: "bytes32",
        name: "domainSeparator",
        type: "bytes32",
      },
    ],
    name: "recoverTypeTwo",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "operation",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "contractAddress",
            type: "address",
          },
          {
            internalType: "uint256[]",
            name: "rules",
            type: "uint256[]",
          },
          {
            internalType: "bool",
            name: "flag",
            type: "bool",
          },
          {
            internalType: "uint8[]",
            name: "approversGiven",
            type: "uint8[]",
          },
          {
            internalType: "address[]",
            name: "logicsList",
            type: "address[]",
          },
          {
            internalType: "bytes",
            name: "constantsList",
            type: "bytes",
          },
          {
            components: [
              {
                internalType: "bool",
                name: "exists",
                type: "bool",
              },
            ],
            internalType: "struct AStruct",
            name: "structure1",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "string",
                name: "custom",
                type: "string",
              },
            ],
            internalType: "struct BStruct",
            name: "structure2",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "string",
                name: "tests",
                type: "string",
              },
              {
                internalType: "enum Operations",
                name: "testEnum",
                type: "uint8",
              },
            ],
            internalType: "struct TypeTwo",
            name: "structure3",
            type: "tuple",
          },
          {
            internalType: "bytes32",
            name: "nonce",
            type: "bytes32",
          },
        ],
        internalType: "struct TypeOne",
        name: "message",
        type: "tuple",
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
      {
        internalType: "string",
        name: "operationId",
        type: "string",
      },
      {
        internalType: "bytes32",
        name: "domainSeparator",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
      {
        internalType: "string",
        name: "errMessage",
        type: "string",
      },
    ],
    name: "verifyTypeOne",
    outputs: [],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "string",
            name: "tests",
            type: "string",
          },
          {
            internalType: "enum Operations",
            name: "testEnum",
            type: "uint8",
          },
        ],
        internalType: "struct TypeTwo",
        name: "message",
        type: "tuple",
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
      {
        components: [
          {
            internalType: "string",
            name: "tests",
            type: "string",
          },
          {
            internalType: "enum Operations",
            name: "testEnum",
            type: "uint8",
          },
        ],
        internalType: "struct TypeTwo",
        name: "structure3",
        type: "tuple",
      },
      {
        internalType: "bytes32",
        name: "domainSeparator",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
      {
        internalType: "string",
        name: "errMessage",
        type: "string",
      },
    ],
    name: "verifyTypeTwo",
    outputs: [],
    stateMutability: "pure",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b506110e9806100206000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c80633170c3271461005c57806367e7c11b14610071578063754640b11461010f578063764252701461012257806393dd990b1461014d575b600080fd5b61006f61006a366004610a81565b610160565b005b6100fc61007f366004610c02565b8251602093840120825192840192909220604080517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f818701528082019490945260608401919091524660808401526001600160a01b039190911660a0808401919091528151808403909101815260c09092019052805191012090565b6040519081526020015b60405180910390f35b61006f61011d366004610c88565b6101ba565b610135610130366004610d5b565b610209565b6040516001600160a01b039091168152602001610106565b61013561015b366004610df1565b61026c565b826001600160a01b03166101788a8a8a8a8a8a61026c565b6001600160a01b031614828290916101ad5760405162461bcd60e51b81526004016101a4929190610e8e565b60405180910390fd5b5050505050505050505050565b826001600160a01b03166101d18989898989610209565b6001600160a01b031614828290916101fd5760405162461bcd60e51b81526004016101a4929190610e8e565b50505050505050505050565b60008061021687856102d1565b8051906020012090506102618187878080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250889250610403915050565b979650505050505050565b60008061027a888686610425565b8051906020012090506102c58188888080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250889250610403915050565b98975050505050505050565b60607f8dfd298be4383abff832270fe13f15def9062ed815f527172d6de9b41375daf06102fe8480610ebd565b60405161030c929190610f04565b60405180910390208460200160208101906103279190610f14565b801561033557610335610f35565b7f8dfd298be4383abff832270fe13f15def9062ed815f527172d6de9b41375daf06103608680610ebd565b60405161036e929190610f04565b60405180910390208660200160208101906103899190610f14565b801561039757610397610f35565b60408051602081019490945283019190915260ff16606082015260800160408051601f1981840301815282825280516020918201209083019590955281019290925260ff166060820152608081019190915260a001604051602081830303815290604052905092915050565b6000806104108584610768565b905061041c8185610790565b95945050505050565b60607f4b147046c061b02e53489ebcecd5087ef809f11e80141ebe1567861ccc500f69843561045a6040870160208801610f4b565b6104676040880188610f66565b604051602001610478929190610fb0565b60408051601f1981840301815291905280516020909101206104a06080890160608a01610fd9565b6104ad60808a018a610f66565b6040516020016104be929190610ffb565b60408051601f1981840301815291905280516020909101206104e360a08b018b610f66565b6040516020016104f492919061103d565b60408051601f19818403018152919052805160209091012061051960c08c018c610ebd565b604051610527929190610f04565b6040519081900390207f36e251c8f0527955e62396f2bee7a69c385c3b32bef4775677f2202ec8ad24de6105626101008e0160e08f01610fd9565b60405160200161057e9291909182521515602082015260400190565b60408051601f1981840301815291905280516020909101207f989b3a0db44b8b43aa74ad26dd71acfa25f931573a2ec8f903940f69456897076105c56101008f018f61107d565b6105cf9080610ebd565b6040516105dd929190610f04565b6040519081900381206105fc9291602001918252602082015260400190565b604051602081830303815290604052805190602001207f8dfd298be4383abff832270fe13f15def9062ed815f527172d6de9b41375daf08e806101200190610644919061109d565b61064e9080610ebd565b60405161065c929190610f04565b60405180910390208f806101200190610675919061109d565b610686906040810190602001610f14565b801561069457610694610f35565b60408051602081019490945283019190915260ff166060820152608001604051602081830303815290604052805190602001208e61014001358e8e6040516106dd929190610f04565b60408051918290038220602083019e909e5281019b909b526001600160a01b0390991660608b015260808a019790975294151560a089015260c088019390935260e08701919091526101008601526101208501526101408401526101608301526101808201526101a08101919091526101c00160405160208183030381529060405290509392505050565b60405161190160f01b81526002810182905260228101839052604290206000905b9392505050565b600080600061079f85856107b4565b915091506107ac816107f9565b509392505050565b60008082516041036107ea5760208301516040840151606085015160001a6107de87828585610946565b945094505050506107f2565b506000905060025b9250929050565b600081600481111561080d5761080d610f35565b036108155750565b600181600481111561082957610829610f35565b036108765760405162461bcd60e51b815260206004820152601860248201527f45434453413a20696e76616c6964207369676e6174757265000000000000000060448201526064016101a4565b600281600481111561088a5761088a610f35565b036108d75760405162461bcd60e51b815260206004820152601f60248201527f45434453413a20696e76616c6964207369676e6174757265206c656e6774680060448201526064016101a4565b60038160048111156108eb576108eb610f35565b036109435760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c604482015261756560f01b60648201526084016101a4565b50565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a083111561097d5750600090506003610a01565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa1580156109d1573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b0381166109fa57600060019250925050610a01565b9150600090505b94509492505050565b60006101608284031215610a1d57600080fd5b50919050565b60008083601f840112610a3557600080fd5b50813567ffffffffffffffff811115610a4d57600080fd5b6020830191508360208285010111156107f257600080fd5b80356001600160a01b0381168114610a7c57600080fd5b919050565b600080600080600080600080600060c08a8c031215610a9f57600080fd5b893567ffffffffffffffff80821115610ab757600080fd5b610ac38d838e01610a0a565b9a5060208c0135915080821115610ad957600080fd5b610ae58d838e01610a23565b909a50985060408c0135915080821115610afe57600080fd5b610b0a8d838e01610a23565b909850965060608c01359550869150610b2560808d01610a65565b945060a08c0135915080821115610b3b57600080fd5b50610b488c828d01610a23565b915080935050809150509295985092959850929598565b634e487b7160e01b600052604160045260246000fd5b600082601f830112610b8657600080fd5b813567ffffffffffffffff80821115610ba157610ba1610b5f565b604051601f8301601f19908116603f01168101908282118183101715610bc957610bc9610b5f565b81604052838152866020858801011115610be257600080fd5b836020870160208301376000602085830101528094505050505092915050565b600080600060608486031215610c1757600080fd5b833567ffffffffffffffff80821115610c2f57600080fd5b610c3b87838801610b75565b94506020860135915080821115610c5157600080fd5b50610c5e86828701610b75565b925050610c6d60408501610a65565b90509250925092565b600060408284031215610a1d57600080fd5b60008060008060008060008060c0898b031215610ca457600080fd5b883567ffffffffffffffff80821115610cbc57600080fd5b610cc88c838d01610c76565b995060208b0135915080821115610cde57600080fd5b610cea8c838d01610a23565b909950975060408b0135915080821115610d0357600080fd5b610d0f8c838d01610c76565b965060608b01359550610d2460808c01610a65565b945060a08b0135915080821115610d3a57600080fd5b50610d478b828c01610a23565b999c989b5096995094979396929594505050565b600080600080600060808688031215610d7357600080fd5b853567ffffffffffffffff80821115610d8b57600080fd5b610d9789838a01610c76565b96506020880135915080821115610dad57600080fd5b610db989838a01610a23565b90965094506040880135915080821115610dd257600080fd5b50610ddf88828901610c76565b95989497509295606001359392505050565b60008060008060008060808789031215610e0a57600080fd5b863567ffffffffffffffff80821115610e2257600080fd5b610e2e8a838b01610a0a565b97506020890135915080821115610e4457600080fd5b610e508a838b01610a23565b90975095506040890135915080821115610e6957600080fd5b50610e7689828a01610a23565b979a9699509497949695606090950135949350505050565b60208152816020820152818360408301376000818301604090810191909152601f909201601f19160101919050565b6000808335601e19843603018112610ed457600080fd5b83018035915067ffffffffffffffff821115610eef57600080fd5b6020019150368190038213156107f257600080fd5b8183823760009101908152919050565b600060208284031215610f2657600080fd5b81356001811061078957600080fd5b634e487b7160e01b600052602160045260246000fd5b600060208284031215610f5d57600080fd5b61078982610a65565b6000808335601e19843603018112610f7d57600080fd5b83018035915067ffffffffffffffff821115610f9857600080fd5b6020019150600581901b36038213156107f257600080fd5b60006001600160fb1b03831115610fc657600080fd5b8260051b80858437919091019392505050565b600060208284031215610feb57600080fd5b8135801515811461078957600080fd5b6000818482805b8681101561103157823560ff811680821461101b578384fd5b8552506020938401939290920191600101611002565b50919695505050505050565b60008184825b85811015611072576001600160a01b0361105c83610a65565b1683526020928301929190910190600101611043565b509095945050505050565b60008235601e1983360301811261109357600080fd5b9190910192915050565b60008235603e1983360301811261109357600080fdfea264697066735822122042899caed90d69ab991816db03dfaccd587cea3b637a46660fe6f93ceb4465f664736f6c63430008130033";

type SignatureVerification_TypeOne_TypeTwoConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: SignatureVerification_TypeOne_TypeTwoConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class SignatureVerification_TypeOne_TypeTwo__factory extends ContractFactory {
  constructor(...args: SignatureVerification_TypeOne_TypeTwoConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<SignatureVerification_TypeOne_TypeTwo> {
    return super.deploy(
      overrides || {}
    ) as Promise<SignatureVerification_TypeOne_TypeTwo>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): SignatureVerification_TypeOne_TypeTwo {
    return super.attach(address) as SignatureVerification_TypeOne_TypeTwo;
  }
  override connect(
    signer: Signer
  ): SignatureVerification_TypeOne_TypeTwo__factory {
    return super.connect(
      signer
    ) as SignatureVerification_TypeOne_TypeTwo__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SignatureVerification_TypeOne_TypeTwoInterface {
    return new utils.Interface(
      _abi
    ) as SignatureVerification_TypeOne_TypeTwoInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): SignatureVerification_TypeOne_TypeTwo {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as SignatureVerification_TypeOne_TypeTwo;
  }
}
