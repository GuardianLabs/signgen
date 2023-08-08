import {
  STRUCTS_FILENAME,
  TYPEHASH_DEFINITIONS_FILENAME,
} from "../../../cli/config";
import { IDefinition } from "../../types";
import {
  buildEncodeFunctions,
  buildRecoverFunctions,
  buildVerifyFunctions,
} from "../constructions/nonterminals";
import {
  BUILD_DOMAIN_SEPARATOR_PROXY,
  ECDSA_OZ,
  SOLIDITY_19,
  UNLICENSED_LICENSE,
} from "../constructions/terminals";

export const composeLib = (def: IDefinition, name: string) => {
  return `

    ${UNLICENSED_LICENSE}
    ${SOLIDITY_19}

    ${ECDSA_OZ}
    import "./${STRUCTS_FILENAME}.sol";
    import "./${TYPEHASH_DEFINITIONS_FILENAME}.sol";
    import { Util } from "./UtilLib.sol";

    contract SignatureVerification { // _${name}

        string internal _domainName;
        string internal _domainVersion;

        constructor(string memory domainName, string memory domainVersion) {
          _domainName = domainName;
          _domainVersion = domainVersion;
        }

        ${BUILD_DOMAIN_SEPARATOR_PROXY}
        // For elimination of "Stack too deep" error

        ${buildEncodeFunctions(def)}

        ${buildRecoverFunctions(def)}

        ${buildVerifyFunctions(def)}
    }
    `;
};
