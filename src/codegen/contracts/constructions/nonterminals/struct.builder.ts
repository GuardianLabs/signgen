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