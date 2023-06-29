import { IDefinition, IProperty } from "../../../types";
import { formatCapitalSnake, formatSolidityParameters, optionalComma, optionalString, wrapArgument } from "../../../utils";
import { BR, TAB } from "../terminals";
import { composeEncodeArgument, composeParameters } from "./substrings";

export const buildEncodeFunctions = (def: IDefinition): string => def.struct
    .map(el => `

    function encode${el.name}Parameters (
        ${el.name} memory message ${optionalComma(el.external)}
        ${optionalString(el.external, composeParameters)}
    ) internal pure returns (bytes memory) {

        return abi.encode(
            ${formatCapitalSnake(el.name)}_TYPEHASH,
            ${el.props.map(prop => wrapArgument(`message.${prop.name}`, prop.type, def, prop)).join(`,${BR}`)}
            ${optionalComma(el.external)}
            ${optionalString(el.external, composeEncodeArgument(def))}
        );
    }`)
    .join(BR);