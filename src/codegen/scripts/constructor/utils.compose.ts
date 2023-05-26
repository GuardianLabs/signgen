import { IDefinition } from "../../types";
import {
    buildMessage,
    buildParams,
    buildSignedMessage,
    buildSignature
} from "../constructions/nonterminals";

export const composeUtils = (def: IDefinition) => {
    return `
    import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/src/signers";
    import { ${def.struct.map(el => `${el.name}Message, ${el.name}Type, ${el.name}Params`).join(', ')}, EIP712DomainType } from "./message.types";

    ${buildMessage(def)}

    ${buildParams(def)}

    ${buildSignedMessage(def)}

    ${buildSignature(def)}
    `;
}