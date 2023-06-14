import { IDefinition } from "../../codegen/types";
import { uniquePropertyWise } from "../../codegen/utils";

type ValidationResult = [isValid: boolean, error: string];

export const isValidDefinition = (def: IDefinition): ValidationResult => {

    if(def.struct.length == 0) {
        return [false, "Empty message definitions are not allowed"];
    }

    if (def.struct.map(message => message.props.length).some(len => len == 0)) {
        return [false, "Messages with no fields are not allowed"];
    }

    const uniqueArr = def.struct
        .filter(uniquePropertyWise('name'))

    if(uniqueArr.length != def.struct.length) return [false, "Message types duplicate by name"];

    return [true, ''];
}

export const validateDefinition = (def: IDefinition): void =>  {
    const [success, err] = isValidDefinition(def);

    if(!success) throw new Error(`Definition is invalid: ${err}`);
}