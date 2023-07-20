import { IDefinition } from "../../types";
import { buildStubTypeHash, buildTypeHash } from "../constructions/nonterminals";
import { UNLICENSED_LICENSE, SOLIDITY_19, DOMAIN_TYPEHASH_WITH_SALT, DOMAIN_TYPEHASH } from "../constructions/terminals";

export const composeTypehash = (def: IDefinition) => {

    return `
    
    ${UNLICENSED_LICENSE}
    ${SOLIDITY_19}

    ${def.domain.salt ? DOMAIN_TYPEHASH_WITH_SALT : DOMAIN_TYPEHASH}

    ${buildTypeHash(def)}

    ${buildStubTypeHash(def)}
    `;
}