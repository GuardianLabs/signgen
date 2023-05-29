import { IDefinition } from "../../../types";
import { formatCapitalSnake, formatSolidityParameters } from "../../../utils";
import { BR, SPACE, TAB } from "../terminals";

export const buildVerifyFunctions = (def: IDefinition): string => def.struct
    .map(el => `
    function verify${el.name} (
        ${el.name}Signed calldata params,
        ${el.external ? formatSolidityParameters(el.external) : ''}
        bytes32 domainSeparator,
        address addr
    ) public pure returns (bool) {

        return recover${el.name}(params, ${el.external?.map(prop => `${prop.name},`).join(SPACE) || ''} domainSeparator) == addr;
    }`)
    .join(BR);