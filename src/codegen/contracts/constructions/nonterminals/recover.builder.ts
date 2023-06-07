import { IDefinition } from "../../../types";
import { formatCapitalSnake, formatSolidityParameters, wrapArgument } from "../../../utils";
import { BR, SPACE, TAB } from "../terminals";

export const buildRecoverFunctions = (def: IDefinition): string => def.struct
    .map(el => `

    function recover${el.name} (
        ${el.name} calldata message,
        bytes calldata signature,
        ${el.external.length != 0 ? formatSolidityParameters(el.external) : ''}
        bytes32 domainSeparator
    ) public pure returns (address) {

        bytes32 structHash = keccak256(
            abi.encode(
                ${formatCapitalSnake(el.name)}_TYPEHASH,
                ${el.props.map(prop => wrapArgument(`message.${prop.name}`, prop.type, def, prop.struct)).join(`,${BR}${TAB.repeat(2)}`)} ${el.external.length != 0 ? ',' : ''}
                ${el.external?.map(prop => wrapArgument(prop.name, prop.type, def, prop.struct)).join(`,${BR}${TAB.repeat(2)}`) || ''}
            )
        );
    
        return hashAndRecover(structHash, signature, domainSeparator);
    }`)
    .join(BR);


    // function buildStructHash${el.name} (
    //     ${el.props.length != 0 ? formatSolidityParameters(el.props) : ''}
    //     ${el.external.length != 0 ? formatSolidityParameters(el.external).replace(/.$/,"") : ''}
    // ) internal pure returns (bytes32) {
    //     return keccak256(
    //         abi.encode(
    //             ${formatCapitalSnake(el.name)}_TYPEHASH,
    //             ${el.props.map(prop => wrapArgument(prop.name, prop.type)).join(`,${BR}${TAB.repeat(2)}`)} ${el.external.length != 0 ? ',' : ''}
    //             ${el.external?.map(prop => wrapArgument(prop.name, prop.type)).join(`,${BR}${TAB.repeat(2)}`) || ''}
    //         )
    //     );
    // }