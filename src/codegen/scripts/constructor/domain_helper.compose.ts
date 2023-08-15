import { IDefinition } from "../../types";
import { buildDomainHelper } from "../constructions/nonterminals/domain_helper.builder";

export const composeDomainHelper = (def: IDefinition) => {
  return `
    ${buildDomainHelper(def)}
    `;
};
