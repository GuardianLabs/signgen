import { IDefinition, IProperty } from "../../../types";
import { BR, SPACE, TAB } from "../terminals";

export const buildDomainSeparatorFunctions = (def: IDefinition): string => def.struct
    .map(el => `

    function buildDomainSeparator${el.name} (
        string memory domainName,
        string memory version,
        address verifyingContract
    ) external view returns (bytes32) {

        return Util.buildDomainSeparator(domainName, version, verifyingContract);
    }

    function buildDomainSeparator${el.name}WithSalt (
        string memory domainName,
        string memory version,
        address verifyingContract,
        bytes32 salt
    ) external view returns (bytes32) {

        return Util.buildDomainSeparatorWithSalt(domainName, version, verifyingContract, salt);
    }
    `)
    .join(BR);