import { IProperty } from "../types";

export const unique = (value: any, index: any, array: any) => array.indexOf(value) === index;

export const uniquePropertyWise = (property: string) => (value: any, index: any, array: any) =>
    index === array.findIndex((el: any) => (
        el[property] == value[property]
    ));