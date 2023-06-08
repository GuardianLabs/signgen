import { IDefinition, IStructProperty } from "../../../types";
import { stubUndefinedStruct } from "../../../utils";
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
    .filter(el => (el as IStructProperty).struct)
    .filter(el => !def.struct.map(el => el.name).includes(el.type))
    .filter((value, index, self) =>
            index === self.findIndex(el => (
                el.type == value.type
        ))
    )
    .filter((value, index, array) => array.indexOf(value) === index)
    .map(el => `
    struct ${el.type} {
        ${stubUndefinedStruct().map(prop => `${prop.type} ${prop.name};`).join(BR + TAB)}
    }`)
    .join(BR);