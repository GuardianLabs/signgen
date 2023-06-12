import { IDefinition } from "../../codegen/types";
import { uniquePropertyWise } from "../../codegen/utils";

type ValidationResult = [isValid: boolean, error: string];

export const isValidDefinition = (def: IDefinition): ValidationResult => {
    const uniqueArr = def.struct
        .filter(uniquePropertyWise('name'))

    if(uniqueArr.length != def.struct.length) return [false, "Message types duplicate by name"];

    return [true, ''];
}

export const validateDefinition = (def: IDefinition): void =>  {
    const [success, err] = isValidDefinition(def);

    if(!success) throw new Error(`Definition is invalid: ${err}`);
}