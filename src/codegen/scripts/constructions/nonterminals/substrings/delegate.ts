import { IDefinition, IProperty } from "../../../../types";
import { pasteDefaultStub } from "../../../../utils";
import { BR } from "../../terminals";

export const composeConstantStubs = (def: IDefinition) => (props: IProperty[]) => props.map(ext => `const ${ext.name} = ${pasteDefaultStub(ext.type, def, ext)};`).join(BR);
export const composeArgument = (props: IProperty[]) => props.map(ext => `${ext.name}`).join(',' + BR);