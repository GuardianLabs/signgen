import { IDefinition } from "../../../types";
import { formatCapitalSnake, formatSolidityParameters } from "../../../utils";
import { BR, SPACE, TAB } from "../terminals";

export const buildVerifyFunctions = (def: IDefinition): string => def.struct
    .map(el => `
    function verify${el.name} (
        bytes memory data,
        bytes calldata signature,
        ${el.external.length != 0 ? formatSolidityParameters(el.external) : ''}
        bytes32 domainSeparator,
        address addr
    ) public pure returns (bool) {

        return recover${el.name}(data, signature, ${el.external?.map(prop => `${prop.name},`).join(SPACE) || ''} domainSeparator) == addr;
    }`)
    .join(BR);