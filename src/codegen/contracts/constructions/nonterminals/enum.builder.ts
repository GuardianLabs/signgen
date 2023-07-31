import { IDefinition, IEnumProperty } from "../../../types";
import { stubUndefinedEnum, uniquePropertyWise } from "../../../utils";
import { BR, TAB } from "../terminals";

export const buildEnumStubs = (def: IDefinition): string =>
  def.struct
    .flatMap((el) => el.props.concat(el.external).filter((prop) => !prop.omit))
    .filter((el) => (el as IEnumProperty).enum)
    .filter(uniquePropertyWise("type"))
    .map(
      (el) => `
    enum ${el.type} {
        ${stubUndefinedEnum().join("," + BR + TAB)}
    }`,
    )
    .join(BR);
