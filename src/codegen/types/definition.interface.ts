export interface IDefinition {
    domain: IDomain
    struct: IEntity[]
}

export interface IEntity {
    name: string,
    props: IProperty[],
    external: IProperty[]
}

export interface IProperty {
    name: string,
    type: string,
    struct?: boolean
}

export interface IDomain {
    name: string,
    version: string,
    chainId?: string,
    verifyingContract?: string
}