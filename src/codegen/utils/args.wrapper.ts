import { IDefinition } from "../types";
import { formatCapitalSnake } from "./string.format";
import { stubUndefinedStruct } from "./type.defaults";

// todo: pre-encode enums
export const wrapArgument = (arg: string, type: string, def: IDefinition, isStruct: boolean = false): string => {
    if(type == "string") {
        return `keccak256(bytes(${arg}))`;
    }

    if(type == "bytes") {
        return `keccak256(${arg})`;
    }

    if(type.includes('[')) {
        return `keccak256(abi.encodePacked(${arg}))`;
    }

    if(isStruct) {
        const target = def.struct.find(el => el.name == type);

        let targetProps = target ? target.props : stubUndefinedStruct();
        return `keccak256(abi.encode(${formatCapitalSnake(type)}_TYPEHASH, ${targetProps.map(el => wrapArgument(`${arg}.${el.name}`, el.type, def, el.struct)).join(', ')}))`;

    }

    return arg;
}