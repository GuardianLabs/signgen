import {
  SIGNATURE_UTILS_FILENAME,
  TYPES_FILENAME,
} from "../../../../cli/config";
import { IDefinition } from "../../../types";

export const buildIndex = (def: IDefinition) => {
  return `
    export * from "./${SIGNATURE_UTILS_FILENAME}";
    export * from "./${TYPES_FILENAME}";
    `;
};
