import { IDefinition } from "../../../types";
import { formatCapitalSnake, formatSolidityParameters } from "../../../utils";
import { BR, SPACE, TAB } from "../terminals";

export const buildVerifyFunctions = (def: IDefinition): string => def.struct
    .map(el => `
    function verify${el.name} (
        ${el.props.length != 0 ? formatSolidityParameters(el.props) : ''}
        bytes calldata signature,
        ${el.external.length != 0 ? formatSolidityParameters(el.external) : ''}
        bytes32 domainSeparator,
        address addr
    ) public pure returns (bool) {

        return recover${el.name}(${el.props?.map(prop => `${prop.name},`).join(SPACE) || ''} signature, ${el.external?.map(ext => `${ext.name},`).join(SPACE) || ''} domainSeparator) == addr;
    }`)
    .join(BR);