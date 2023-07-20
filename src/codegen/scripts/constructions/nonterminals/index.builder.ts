import { TYPES_FILENAME } from "../../../../cli/config";
import { IDefinition } from "../../../types";

export const buildIndex = (def: IDefinition) => {
    const nameCamel = def.struct.map(el=>el.name).join('');

    return `
    export * from "./${nameCamel}.utils";
    export * from "./${TYPES_FILENAME}";
    `;
}