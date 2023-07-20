import { inferType } from "../scripts/parser";
import { IDefinition, IEnumProperty, IProperty, IStructProperty } from "../types";

export const getDefaultStub = (type: string, def: IDefinition, prop: IProperty) => {
    let baseType: any;

    type DefaultKey = keyof typeof Default;
    
    for (const key of Object.keys(Default)) {
        if(type.includes(key)) {
            baseType = Default[key as DefaultKey];
            break;
        } else {
            if((prop as IStructProperty).struct) {
                const target = def.struct.concat(def.related).find(el => el.name == type);

                let targetProps = target ? target.props : stubUndefinedStruct();
                baseType = `{
                    ${targetProps.map(el => `${el.name}: ${pasteDefaultStub(el.type, def, el)}`).join(',')}
                }`;
            } else if ((prop as IEnumProperty).enum) {
                baseType = Default.uint;
            } else {
                baseType = undefined;
            }
        }
    }

    return baseType;
}

export const pasteDefaultStub = (type: string, def: IDefinition, prop: IProperty) => {
    const stub = getDefaultStub(type, def, prop);
    const tsType = inferType(type);

    let outTypeStub;

    if(
        !tsType.includes("BigNumberish") &&
        !tsType.includes("number") && 
        !tsType.includes("boolean") && 
        !(prop as IStructProperty).struct && 
        !(prop as IEnumProperty).enum && 
        stub != undefined
    ) {
        outTypeStub = `"${stub}"`;
    } else {
        outTypeStub = stub;
    }

    if(type.includes('[')) return `[${outTypeStub}]`;

    return outTypeStub;
}

const Default = {
    "string" : "stub",
    bytes: `0x${"0".repeat(64)}`,
    address: `0x${"0".repeat(40)}`,
    bool: "false",
    uint: "0",
    int: "0"
}

export const stubUndefinedStruct = (): IProperty[] => ([{name: "exists", type: "bool"}]);
export const stubUndefinedEnum = () => ["EXISTS"];