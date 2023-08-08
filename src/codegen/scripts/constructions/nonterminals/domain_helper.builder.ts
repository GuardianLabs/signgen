import { IDefinition } from "../../../types";

export const buildDomainHelper = (def: IDefinition) => `
    export const getDomainName = () => "${def.domain.name}";
    export const getDomainVersion = () => "${def.domain.version}";
`;