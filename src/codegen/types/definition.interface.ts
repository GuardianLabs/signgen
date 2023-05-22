export interface IDefinition {
    domain: IDomain
    struct: IEntity[]
}

export interface IEntity {
    name: string,
    props: {
        name: string,
        type: string
    } []
}

export interface IDomain {
    name: string,
    version: string,
    chainId?: string,
    verifyingContract?: string
}