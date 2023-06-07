import { inferType } from "../scripts/parser";
import { IDefinition, IProperty } from "../types";

export const getDefaultStub = (type: string, def: IDefinition, isStruct: boolean) => {
    let baseType: any;

    type DefaultKey = keyof typeof Default;
    
    for (const key of Object.keys(Default)) {
        if(type.includes(key)) {
            baseType = Default[key as DefaultKey];
            break;
        } else {
            if(isStruct) {
                const target = def.struct.find(el => el.name == type);

                let targetProps = target ? target.props : stubUndefinedStruct();
                baseType = `{
                    ${targetProps.map(el => `${el.name}: ${pasteDefaultStub(el.type, def, el.struct)},`)}
                }`;
            } else {
                baseType = undefined;
            }
        }
    }

    return baseType;
}

export const pasteDefaultStub = (type: string, def: IDefinition, isStruct: boolean = false) => {
    const stub = getDefaultStub(type, def, isStruct);
    const tsType = inferType(type);

    let outTypeStub;

    if(!tsType.includes("BigNumberish") && !tsType.includes("number") && !tsType.includes("boolean") && !isStruct && stub != undefined) {
        outTypeStub = `"${stub}"`;
    } else {
        outTypeStub = stub;
    }

    if(type.includes('[')) return `[${outTypeStub}]`;

    return outTypeStub;
}

const Default = {
    "string" : "str",
    bytes: `0x${"0".repeat(64)}`,
    address: `0x${"0".repeat(40)}`,
    bool: "true",
    uint: "1",
    int: "1"
}

export const stubUndefinedStruct = (): IProperty[] => ([{name: "exists", type: "bool"}]);