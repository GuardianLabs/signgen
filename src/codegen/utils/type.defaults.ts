import { inferType } from "../scripts/parser";
import { IDefinition } from "../types";

// todo: stub params by type correctly
// todo: refactor to encapsulate "exists: true" in a stub singleton
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

                if (target) {
                    baseType = `{
                        ${target.props.map(el => `${el.name}: ${pasteDefaultStub(el.type, def, el.struct)},`)}
                    }`;
                } else {
                    baseType = `{
                        exists: true,
                    }`;
                }
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

    if(!tsType.includes("BigNumberish") && !tsType.includes("number") && !isStruct) {
        outTypeStub = `"${stub}"`;
    } else {
        outTypeStub = stub;
    }

    if(type.includes('[')) return `[${outTypeStub}]`;

    return outTypeStub;
}

const Default = {
    "string" : "str",
    bytes: "0x0000000000000000000000000000000000000000000000000000000000000000",
    address: `0x${"0".repeat(40)}`,
    uint: "1",
    int: "1"
}