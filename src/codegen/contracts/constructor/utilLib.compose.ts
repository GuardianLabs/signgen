import { TYPEHASH_DEFINITIONS_FILENAME } from "../../../cli/config";
import {
  BUILD_DOMAIN_SEPARATOR,
  BUILD_DOMAIN_SEPARATOR_WITH_SALT,
  ECDSA_OZ,
  ENCODE_BYTES_ARRAY,
  ENCODE_STRING_ARRAY,
  HASH_AND_RECOVER,
  HASH_TYPED_DATA_V4,
  SOLIDITY_19,
  UNLICENSED_LICENSE,
} from "../constructions/terminals";

export const composeUtilLib = () => {
  return `

    ${UNLICENSED_LICENSE}
    ${SOLIDITY_19}

    ${ECDSA_OZ}
    import "./${TYPEHASH_DEFINITIONS_FILENAME}.sol";

    library Util {

        ${HASH_TYPED_DATA_V4}
        ${HASH_AND_RECOVER}

        ${BUILD_DOMAIN_SEPARATOR_WITH_SALT}
        ${BUILD_DOMAIN_SEPARATOR}

        ${ENCODE_STRING_ARRAY}

        ${ENCODE_BYTES_ARRAY}
    }
    `;
};
