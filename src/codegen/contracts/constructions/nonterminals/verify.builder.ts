import { IDefinition } from "../../../types";
import { formatCapitalSnake, formatSolidityParameters, optionalString } from "../../../utils";
import { BR, SPACE, TAB } from "../terminals";

export const buildVerifyFunctions = (def: IDefinition): string => def.struct
    .map(el => `
    function verify${el.name} (
        ${el.name} calldata message,
        bytes calldata signature,
        ${optionalString(el.external, formatSolidityParameters)}
        bytes32 domainSeparator,
        address addr,
        string calldata errMessage
    ) public pure {

        require(
            recover${el.name}(message, signature, ${el.external?.map(ext => `${ext.name},`).join(SPACE) || ''} domainSeparator) == addr,
            errMessage
        );
    }`)
    .join(BR);