import { IDefinition, IProperty } from "../../../types";
import { formatCapitalSnake, formatSolidityParameters, optionalComma, optionalString, wrapArgument } from "../../../utils";
import { BR, SPACE, TAB } from "../terminals";
import { composeCustomEncodeArgument } from "./substrings";

export const buildRecoverFunctions = (def: IDefinition): string => def.struct
    .map(el => `

    function recover${el.name} (
        ${el.name} memory message,
        bytes memory signature,
        ${optionalString(el.external, formatSolidityParameters)}
        bytes32 domainSeparator
    ) public pure returns (address) {

        bytes32 structHash = keccak256(
            encode${el.name}Parameters(message ${optionalComma(el.external.filter(prop => !prop.omit))} ${optionalString(el.external.filter(prop => !prop.omit), composeCustomEncodeArgument)})
        );
    
        return Util.hashAndRecover(structHash, signature, domainSeparator);
    }`)
    .join(BR);