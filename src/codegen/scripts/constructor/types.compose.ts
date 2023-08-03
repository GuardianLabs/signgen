import { IDefinition } from "../../types";
import {
  buildEIP712MessageTypes,
  buildMessageType,
} from "../constructions/nonterminals";
import { EIP712DomainType, ParamType } from "../constructions/terminals";

export const composeTypes = (def: IDefinition) => {
  return `
   
    import { BytesLike, BigNumberish } from 'ethers';

    ${buildMessageType(def)}

    ${buildEIP712MessageTypes(def)}

    ${ParamType}

    ${EIP712DomainType}
    `;
};
