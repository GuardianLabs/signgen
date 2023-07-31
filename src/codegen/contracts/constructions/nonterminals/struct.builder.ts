import { IDefinition, IStructProperty } from "../../../types";
import {
  stubUndefinedStruct,
  unique,
  uniquePropertyWise,
} from "../../../utils";
import { BR, TAB } from "../terminals";
import { composeStructFields } from "./substrings";

export const buildStruct = (def: IDefinition): string =>
  def.struct
    .map(
      (el) => `
    struct ${el.name} {
        ${composeStructFields(el.props)}
    }`,
    )
    .join(BR);

export const buildSignedStruct = (def: IDefinition): string =>
  def.struct
    .map(
      (el) => `
    struct ${el.name}Signed {
        ${el.name} message;
        bytes signature;
    }`,
    )
    .join(BR);

export const buildRelatedStruct = (def: IDefinition): string =>
  def.related
    .map(
      (el) => `
    struct ${el.name} {
        ${composeStructFields(el.props)}
    }`,
    )
    .join(BR);

export const buildStructStubs = (def: IDefinition): string =>
  def.struct
    .flatMap((el) => el.props.concat(el.external))
    .filter((el) => (el as IStructProperty).struct)
    .filter((el) => !def.struct.map((el) => el.name).includes(el.type))
    .filter((el) => !def.related.map((el) => el.name).includes(el.type))
    .filter(uniquePropertyWise("type"))
    .filter(unique)
    .map(
      (el) => `
    struct ${el.type} {
        ${stubUndefinedStruct()
          .map((prop) => `${prop.type} ${prop.name};`)
          .join(BR + TAB)}
    }`,
    )
    .join(BR);
