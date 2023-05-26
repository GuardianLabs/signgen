import { IDefinition } from "../../types";
import {
    buildMessage,
    buildSignedMessage,
} from "../constructions/nonterminals";

export const composeUtils = (def: IDefinition) => {
    return `
    import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/src/signers";
    import { ${def.struct.map(el => `${el.name}Message, ${el.name}Type`).join(', ')}, EIP712DomainType } from "./message.types";

    ${buildMessage(def)}

    ${buildSignedMessage(def)}
    `;
}