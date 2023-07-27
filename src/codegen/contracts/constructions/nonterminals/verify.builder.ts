import { IDefinition } from "../../../types";
import { formatSolidityParameters, optionalString } from "../../../utils";
import { BR } from "../terminals";
import { composeArgument } from "./substrings";

export const buildVerifyFunctions = (def: IDefinition): string =>
  def.struct
    .map(
      (el) => `
    function verify${el.name} (
        ${el.name} memory message,
        bytes memory signature,
        ${optionalString(el.external, formatSolidityParameters)}
        bytes32 domainSeparator,
        address addr,
        string calldata errMessage
    ) public pure {

        require(
            recover${el.name}(message, signature, ${optionalString(
        el.external,
        composeArgument
      )} domainSeparator) == addr,
            errMessage
        );
    }`
    )
    .join(BR);
