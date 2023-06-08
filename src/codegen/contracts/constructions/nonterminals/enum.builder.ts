import { IDefinition, IEnumProperty } from "../../../types";
import { stubUndefinedEnum } from "../../../utils";
import { BR, TAB } from "../terminals";

export const buildEnumStubs = (def: IDefinition): string => def.struct
    .flatMap(el => el.props.concat(el.external))
    .filter(el => (el as IEnumProperty).enum)
    .filter((value, index, self) =>
            index === self.findIndex(el => (
                el.type == value.type
        ))
    )
    .map(el => `
    enum ${el.type} {
        ${stubUndefinedEnum().join("," + BR + TAB)}
    }`)
    .join(BR);