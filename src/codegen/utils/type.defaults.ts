import { inferType } from "../scripts/parser";

// todo: stub params by type correctly
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
    "string" : "str",
    bytes: "0x0000000000000000000000000000000000000000000000000000000000000000",
    address: `0x${"0".repeat(40)}`,
    uint: "1",
    int: "1"
}