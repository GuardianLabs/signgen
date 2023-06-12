import { IDefinition, IProperty } from "../../../../types";
import { formatSolidityParameters, wrapArgument } from "../../../../utils";
import { BR, SPACE } from "../../terminals";

export const composeArgument = (props: IProperty[]) => props.map(ext => `${ext.name},`).join(SPACE);
export const composeEncodeArgument = (def: IDefinition) => (props: IProperty[]) => props.map(prop => wrapArgument(prop.name, prop.type, def, prop)).join(`,${BR}`);
export const composeParameters = (props: IProperty[]) => formatSolidityParameters(props).replace(/.$/,"");
export const composeCustomEncodeArgument = (props: IProperty[]) => props.map(ext => `${ext.name}`).join(',' + SPACE);