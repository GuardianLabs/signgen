import { IDefinition } from "../../../types";
import { formatCapitalSnake, formatSolidityParameters } from "../../../utils";
import { BR, TAB } from "../terminals";

// todo: pre-encode custom types separately like keccak256(bytes(operationType))
export const buildRecoverFunctions = (def: IDefinition): string => def.struct
    .map(el => `
    function recover${el.name} (
        ${el.name}Signed calldata params,
        ${el.external ? formatSolidityParameters(el.external) : ''}
        bytes32 domainSeparator
    ) public pure returns (address) {

        ${el.name} memory message = params.message;

        bytes32 structHash = keccak256(
            abi.encode(
                ${formatCapitalSnake(el.name)}_TYPEHASH,
                ${el.props.map(prop => `message.${prop.name}`).join(`,${BR}${TAB.repeat(2)}`)} ${el.external ? ',' : ''}
                ${el.external?.map(prop => prop.name).join(`,${BR}${TAB.repeat(2)}`) || ''}
            )
        );

        return hashAndRecover(structHash, params.signature, domainSeparator);
    }`)
    .join(BR);