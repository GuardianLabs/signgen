import { IDefinition } from "../../../types";
import { BR, TAB } from "../terminals";

export const buildStruct = (def: IDefinition): string => def.struct
    .map(el => `
    struct ${el.name} {
        ${el.props.map(prop => `${prop.type} ${prop.name};`).join(BR + TAB)}
    }`)
    .join(BR);

export const buildSignedStruct = (def: IDefinition): string => def.struct
    .map(el => `
    struct ${el.name}Signed {
        ${el.name} message;
        bytes signature;
    }`)
    .join(BR);

export const buildStructStubs = (def: IDefinition): string => def.struct
.flatMap(el => el.props.concat(el.external))
.filter(el => el.struct)
.filter(el => !def.struct.map(el => el.name).includes(el.type))
.filter((value, index, array) => array.indexOf(value) === index)
.map(el => `
struct ${el.type} {
    bool exists;
}`)
.join(BR);