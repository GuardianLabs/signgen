import {
  IDefinition,
  IEntity,
  IEnumProperty,
  IStructProperty,
} from "../../../types";
import {
  formatCapitalSnake,
  stubUndefinedStruct,
  unique,
  uniquePropertyWise,
} from "../../../utils";
import { BR } from "../terminals";

const typeHashScaffold = (el: IEntity) =>
  `${el.name}(${el.props
    .filter((prop) => !prop.omit)
    .map(
      (prop) =>
        `${(prop as IEnumProperty).enum ? "uint8" : prop.type} ${prop.name}`
    )
    .join(",")}${
    el.external.filter((prop) => !prop.omit).length == 0
      ? ""
      : "," +
        el.external
          .filter((prop) => !prop.omit)
          .map(
            (ext) =>
              `${(ext as IEnumProperty).enum ? "uint8" : ext.type} ${ext.name}`
          )
          .join(",")
  })`;

const buildTypeHashRecursively = (
  el: IEntity,
  def: IDefinition,
  includedStructs: IEntity[],
  acc: number = 0
): void => {
  if (acc != 0) includedStructs.push(el);

  for (const prop of el.props
    .concat(el.external)
    .filter((prop) => !prop.omit)) {
    if ((prop as IStructProperty).struct) {
      const struct = def.struct
        .concat(def.related)
        .find((struct) => struct.name == prop.type && struct.name != el.name);

      if (struct) {
        buildTypeHashRecursively(struct, def, includedStructs, ++acc);
      } else {
        includedStructs.push({
          name: prop.type,
          props: stubUndefinedStruct(),
          external: [],
        });
      }
    }
  }
};

export const buildTypeHash = (def: IDefinition): string =>
  def.struct
    .concat(def.related)
    .map((el) => {
      let includedStructs: IEntity[] = [];

      buildTypeHashRecursively(el, def, includedStructs);

      includedStructs = includedStructs
        .filter(uniquePropertyWise("name"))
        .sort((a, b) => a.name.localeCompare(b.name));

      let res = includedStructs.map((inc) => typeHashScaffold(inc)).join("");

      res = typeHashScaffold(el) + res;

      return `
        bytes32 constant ${formatCapitalSnake(el.name)}_TYPEHASH = keccak256(
            "${res}");`;
    })
    .join(BR);

export const buildStubTypeHash = (def: IDefinition): string =>
  def.struct
    .flatMap((el) => el.props.concat(el.external))
    .filter((el) => (el as IStructProperty).struct)
    .filter((el) => !def.struct.map((el) => el.name).includes(el.type))
    .filter((el) => !def.related.map((el) => el.name).includes(el.type))
    .filter(uniquePropertyWise("type"))
    .filter(unique)
    .map(
      (el) => `
    bytes32 constant ${formatCapitalSnake(el.type)}_TYPEHASH = keccak256("${
        el.type
      }(${stubUndefinedStruct()
        .map((prop) => `${prop.type} ${prop.name}`)
        .join(",")})");
    `
    )
    .join(BR);
