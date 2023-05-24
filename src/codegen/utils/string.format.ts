import { BR, TAB } from "../contracts/constructions/terminals";
import { IProperty } from "../types";

export const formatCapitalSnake = (str: string) => 
    str
    .split(/(?=[A-Z])/)
    .map(el => el.toUpperCase())
    .join("_");

export const formatSolidityParameters = (props: IProperty[]): string => {
    return props
        .map(prop => 
            dynamicAllocTypes.some(el => prop.type.includes(el)) || prop.struct ?
            `${prop.type} memory ${prop.name},` : `${prop.type} ${prop.name},`
        )
        .join(BR + TAB);
}

const dynamicAllocTypes = ["string", "bytes ", "[]"];