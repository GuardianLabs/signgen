import { Extension } from '../config';
interface ISaveConfig {
    dirPath: string;
    content: string;
    name: string;
    ext: Extension;
}
export declare function save({ dirPath, content, name, ext }: ISaveConfig): string;
export declare function prettifySolidity(targetFolder: string): Promise<void>;
export declare function prettifyTypescript(targetFolder: string): Promise<void>;
export declare function compile(targetFolder: string): Promise<void>;
export declare function transpile(targetFolder: string): Promise<void>;
export declare function testWithTrace(targetFolder: string): Promise<void>;
export declare function test(targetFolder: string): Promise<void>;
export {};