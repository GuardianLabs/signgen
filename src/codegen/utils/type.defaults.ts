import { inferType } from "../scripts/parser";

export const getDefaultStub = (type: string) => {
    let baseType: any;

    type DefaultKey = keyof typeof Default;
    
    for (const key of Object.keys(Default)) {
        if(type.includes(key)) {
            baseType = Default[key as DefaultKey];
            break;
        } else {
            baseType = undefined;
        }
    }

    return baseType;
}

export const pasteDefaultStub = (type: string) => {
    const stub = getDefaultStub(type);
    const tsType = inferType(type);

    let outTypeStub;

    if(!tsType.includes("BigNumberish") && !tsType.includes("number")) {
        outTypeStub = `"${stub}"`;
    } else {
        outTypeStub = stub;
    }

    if(type.includes('[')) return `[${outTypeStub}]`;

    return outTypeStub;
}

const Default = {
    "string" : "string",
    bytes: "0xFF",
    address: `0x${"0".repeat(40)}`,
    uint: "1",
    int: "1"
}