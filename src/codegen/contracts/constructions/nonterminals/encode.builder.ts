import { IDefinition, IProperty } from "../../../types";
import { formatCapitalSnake, formatSolidityParameters, optionalComma, optionalString, wrapArgument } from "../../../utils";
import { BR, TAB } from "../terminals";

export const buildEncodeFunctions = (def: IDefinition): string => def.struct
    .map(el => `

    function encode${el.name}Parameters (
        ${el.name} calldata message ${optionalComma(el.external)}
        ${optionalString(el.external, (props: IProperty[]) => formatSolidityParameters(props).replace(/.$/,""))}
    ) internal pure returns (bytes memory) {

        return abi.encode(
            ${formatCapitalSnake(el.name)}_TYPEHASH,
            ${el.props.map(prop => wrapArgument(`message.${prop.name}`, prop.type, def, prop)).join(`,${BR}`)} ${optionalComma(el.external)}
            ${el.external?.map(prop => wrapArgument(prop.name, prop.type, def, prop)).join(`,${BR}`) || ''}
        );
    }`)
    .join(BR);