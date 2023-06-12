import { IDefinition } from "../../../types";
import { formatCapitalSnake, formatSolidityParameters, optionalComma, optionalString, wrapArgument } from "../../../utils";
import { BR, SPACE, TAB } from "../terminals";

export const buildRecoverFunctions = (def: IDefinition): string => def.struct
    .map(el => `

    function recover${el.name} (
        ${el.name} calldata message,
        bytes calldata signature,
        ${optionalString(el.external, formatSolidityParameters)}
        bytes32 domainSeparator
    ) public pure returns (address) {

        bytes32 structHash = keccak256(
            encode${el.name}Parameters(message ${optionalComma(el.external)} ${el.external?.map(ext => `${ext.name}`).join(',' + SPACE) || ''})
        );
    
        return hashAndRecover(structHash, signature, domainSeparator);
    }`)
    .join(BR);