import { BR, TAB } from "../contracts/constructions/terminals";
import { IProperty, IStructProperty } from "../types";

export const formatCapitalSnake = (str: string) => 
    str
    .split(/(?=[A-Z])/)
    .map(el => el.toUpperCase())
    .join("_");

export const formatSolidityParameters = (props: IProperty[]): string => 
    props
    .map(prop => 
        dynamicAllocTypes.some(el => prop.type.includes(el)) || prop.type == "bytes" || (prop as IStructProperty).struct ?
        `${prop.type} calldata ${prop.name},` : `${prop.type} ${prop.name},`
    )
    .join(BR + TAB);

const dynamicAllocTypes = ["string", "[]"]; // bytes vs bytesX

export const optionalComma = (props: IProperty[]) => `${props?.length != 0 ? "," : ''}`;
export const optionalString = (props: IProperty[], delegate: any) => `${props?.length != 0 ? delegate(props) : ''}`;