import { IDefinition } from "../../../types";
import { formatCapitalSnake } from "../../../utils";
import { BR, TAB } from "../terminals";

export const buildVerifyFunctions = (def: IDefinition): string => def.struct
    .map(el => `
    function verify${el.name} (
        ${el.name}Signed calldata params,
        bytes32 domainSeparator,
        address addr
    ) internal pure returns (bool) {

        return recover${el.name}(${el.name}Signed, domainSeparator) == addr;
    }`)
    .join(BR);