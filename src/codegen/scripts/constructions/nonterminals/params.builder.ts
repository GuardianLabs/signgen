import { IDefinition } from "../../../types";
import { BR } from "../terminals";

export const buildParams = (def: IDefinition) => def.struct
    .map(el => 
        `
    export const prepare${el.name}Params = (
        ${el.props.map(prop => `${prop.name}: ${prop.type}`).join(',' + BR)},
        verifyingContract: string,
        signer: SignerWithAddress
      ): Promise<${el.name}Params> => {
        const timestamp = await getTimestamp();
        const message: ${el.name}Message = {
            ${el.props.map(prop => `${prop.name}`).join(',' + BR)},
            verifyingContract
        };
    
        return prepareStakeAssetMessage(message, signer);
      }`)
    .join(BR);