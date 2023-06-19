export * from './constants';
export declare abstract class Config {
    static get(item: string): string;
    static getOptional(item: string, alt: any): any;
    static isSet(item: string): boolean;
}
