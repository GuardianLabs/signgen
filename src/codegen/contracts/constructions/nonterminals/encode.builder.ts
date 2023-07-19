import { IDefinition, IProperty } from "../../../types";
import { formatCapitalSnake, formatSolidityParameters, optionalComma, optionalString, wrapArgument } from "../../../utils";
import { BR, TAB } from "../terminals";
import { composeEncodeArgument, composeParameters } from "./substrings";

export const buildEncodeFunctions = (def: IDefinition): string => def.struct
    .map(el => `

    function encode${el.name}Parameters (
        ${el.name} memory message ${optionalComma(el.external.filter(prop => !prop.omit))}
        ${optionalString(el.external.filter(prop => !prop.omit), composeParameters)}
    ) internal pure returns (bytes memory) {

        return abi.encode(
            ${formatCapitalSnake(el.name)}_TYPEHASH,
            ${el.props.filter(prop => !prop.omit).map(prop => wrapArgument(`message.${prop.name}`, prop.type, def, prop)).join(`,${BR}`)}
            ${optionalComma(el.external.filter(prop => !prop.omit))}
            ${optionalString(el.external.filter(prop => !prop.omit), composeEncodeArgument(def))}
        );
    }`)
    .join(BR);