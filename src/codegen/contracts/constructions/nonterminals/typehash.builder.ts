import { IDefinition } from "../../../types";
import { formatCapitalSnake } from "../../../utils";
import { BR } from "../terminals";

export const buildTypeHash = (def: IDefinition): string => def.struct
    .map(el => `
    bytes32 constant ${formatCapitalSnake(el.name)}_TYPEHASH = keccak256(
        "${el.name}(${el.props.map(prop => `${prop.type} ${prop.name}`).join(',')})");`) // todo: external props
    .join(BR);