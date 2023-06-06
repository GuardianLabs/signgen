
// todo: pre-encode enums
export const wrapArgument = (arg: string, type: string) => {
    if(type == "string") {
        return `keccak256(bytes(${arg}))`;
    }

    if(type == "bytes") {
        return `keccak256(${arg})`;
    }

    if(type.includes('[')) {
        return `keccak256(abi.encodePacked(${arg}))`;
    }

    return arg;
}