import { Extension } from '../config';
import './types';
interface ISaveConfig {
    dirPath: string;
    content: string;
    name: string;
    ext: Extension;
}
export declare function save({ dirPath, content, name, ext }: ISaveConfig): string;
export declare function prettifySolidity(originalCode: string): string;
export declare function prettifyTypescript(originalCode: string): string;
export declare function compile(targetFolder: string): Promise<void>;
export declare function transpile(targetFolder: string): Promise<void>;
export declare function test(targetFolder: string, testFiles: string[]): Promise<void>;
export {};
