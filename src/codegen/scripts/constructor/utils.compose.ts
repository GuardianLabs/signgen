import { IDefinition } from "../../types";
import {
  buildMessage,
  buildSignedMessage,
} from "../constructions/nonterminals";

export const composeUtils = (def: IDefinition) => {
  return `
   
    import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";
    import { BigNumberish, BytesLike } from "ethers";
    import { ${def.struct
      .map((el) => `${el.name}Message, ${el.name}Type`)
      .join(", ")}, EIP712DomainType, ${def.related
      .map((el) => `${el.name}Type`)
      .join(", ")} } from "./message.types";

    ${buildMessage(def)}

    ${buildSignedMessage(def)}
    `;
};
