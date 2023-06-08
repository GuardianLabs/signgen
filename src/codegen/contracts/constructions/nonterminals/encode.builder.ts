import { IDefinition } from "../../../types";
import { formatCapitalSnake, formatSolidityParameters, wrapArgument } from "../../../utils";
import { BR, TAB } from "../terminals";

export const buildEncodeFunctions = (def: IDefinition): string => def.struct
    .map(el => `

    function encode${el.name}Parameters (
        ${el.name} calldata message ${el.external?.length != 0 ? "," : ''}
        ${el.external?.length != 0 ? formatSolidityParameters(el.external).replace(/.$/,"") : ''}
    ) internal pure returns (bytes memory) {

        return abi.encode(
            ${formatCapitalSnake(el.name)}_TYPEHASH,
            ${el.props.map(prop => wrapArgument(`message.${prop.name}`, prop.type, def, prop.struct)).join(`,${BR}${TAB.repeat(2)}`)} ${el.external.length != 0 ? ',' : ''}
            ${el.external?.map(prop => wrapArgument(prop.name, prop.type, def, prop.struct)).join(`,${BR}${TAB.repeat(2)}`) || ''}
        );
    }`)
    .join(BR);