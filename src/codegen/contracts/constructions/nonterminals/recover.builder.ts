import { IDefinition } from "../../../types";
import { formatCapitalSnake } from "../../../utils";
import { BR, TAB } from "../terminals";

export const buildRecoverFunctions = (def: IDefinition): string => def.struct
    .map(el => `
    function recover${el.name} (
        ${el.name}Signed calldata params,
        bytes32 domainSeparator
    ) internal pure returns (address) {

        bytes32 structHash = keccak256(
            abi.encode(
                ${formatCapitalSnake(el.name)}_TYPEHASH,
                ${el.props.map(prop => `params.${prop.name}`).join(`,${BR}${TAB.repeat(2)}`)}
            )
        );

        return hashAndRecover(structHash, params.signature, domainSeparator);
    }`)
    .join(BR);