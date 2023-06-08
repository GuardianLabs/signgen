import { IDefinition } from "../../codegen/types";

type ValidationResult = [isValid: boolean, error: string];

export const isValidDefinition = (def: IDefinition): ValidationResult => {
    const uniqueArr = def.struct
        .filter((value, index, self) =>
                index === self.findIndex(el => (
                    el.name == value.name
            ))
        )

    if(uniqueArr.length != def.struct.length) return [false, "Message types duplicate by name"];

    return [true, ''];
}

export const validateDefinition = (def: IDefinition): void =>  {
    const [success, err] = isValidDefinition(def);

    if(!success) throw new Error(`Definition is invalid: ${err}`);
}