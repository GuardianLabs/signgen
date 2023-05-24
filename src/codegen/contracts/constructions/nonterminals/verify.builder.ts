import { IDefinition } from "../../../types";
import { formatCapitalSnake } from "../../../utils";
import { BR, SPACE, TAB } from "../terminals";

export const buildVerifyFunctions = (def: IDefinition): string => def.struct
    .map(el => `
    function verify${el.name} (
        ${el.name}Signed calldata params,
        ${el.external?.map(prop => `${prop.type} ${prop.name},`).join(TAB) || ''}
        bytes32 domainSeparator,
        address addr
    ) internal pure returns (bool) {

        return recover${el.name}(params, ${el.external?.map(prop => `${prop.name},`).join(SPACE) || ''} domainSeparator) == addr;
    }`)
    .join(BR);