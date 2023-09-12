import { DOMAIN_HELPER_FILENAME } from "../../../cli/config";
import { IDefinition } from "../../types";
import {
  buildMessage,
  buildSignedMessage,
} from "../constructions/nonterminals";
import { TYPED_SIGNER_INTERFACE } from "../constructions/terminals";

export const composeUtils = (def: IDefinition) => {
  return `
   
    // import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";
    import { BigNumberish, BytesLike } from "ethers";
    import { getDomainName, getDomainVersion } from './${DOMAIN_HELPER_FILENAME}';
    import { ${def.struct
      .map((el) => `${el.name}Message, ${el.name}Type`)
      .join(", ")}, EIP712DomainType, ${def.related
      .map((el) => `${el.name}Type`)
      .join(", ")} } from "./message.types";

    ${TYPED_SIGNER_INTERFACE}

    ${buildMessage(def)}

    ${buildSignedMessage(def)}
    `;
};
