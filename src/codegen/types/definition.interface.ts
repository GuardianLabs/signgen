export interface IDefinition {
    domain: IDomain
    struct: IEntity[]
}

export interface IEntity {
    name: string,
    props: IProperty[],
    external: IProperty[]
}

export type IProperty = IStructProperty | IEnumProperty;

export interface IStructProperty {
    name: string,
    type: string,
    struct?: boolean
}

export interface IEnumProperty {
    name: string,
    type: string,
    enum?: boolean
}

export interface IDomain {
    name: string,
    version: string,
    chainId?: number,
    verifyingContract?: string
    // todo: salt
}