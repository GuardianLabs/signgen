import { IDefinition, IEntity, IProperty } from "../../../types";
import { formatCapitalSnake } from "../../../utils";
import { BR, DOMAIN_TYPEHASH } from "../terminals";
import { TypedDataUtils } from 'signtypeddata-v5';

const typeHashScaffold = (el: IEntity) => `${el.name}(${el.props.map(prop => `${prop.type} ${prop.name}`).join(',')}${el.external.length == 0 ? '' : ',' + el.external.map(ext => `${ext.type} ${ext.name}`).join(',')})`;

const buildTypeHashRecursively = (el: IEntity, def: IDefinition, includedStructs: IEntity[], acc: number = 0): void => {
    
    if(acc != 0) includedStructs.push(el);

    for (const prop of el.props.concat(el.external)) {
        if(prop.struct) {
            const struct = def.struct.find(struct => struct.name == prop.type && struct.name != el.name);

            if(struct) {

                buildTypeHashRecursively(struct, def, includedStructs, ++acc)
            } else {
                includedStructs.push({
                    name: prop.type,
                    props: [],
                    external: []
                });
            }
        }
    }
}

export const buildTypeHash = (def: IDefinition): string => def.struct
    .map(el => {
        let includedStructs: IEntity[] = [];

        buildTypeHashRecursively(el, def, includedStructs);

        includedStructs.sort((a, b) => a.name.localeCompare(b.name));

        let res = includedStructs.map(inc => typeHashScaffold(inc))
        .join('');
        
        res = typeHashScaffold(el) + res;

        return `
        bytes32 constant ${formatCapitalSnake(el.name)}_TYPEHASH = keccak256(
            "${res}");`
    }) 
    .join(BR)
    .concat(DOMAIN_TYPEHASH + BR);