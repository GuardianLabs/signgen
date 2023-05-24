import dotenv from 'dotenv';
export * from './constants';
dotenv.config();

export abstract class Config {
  public static get(item: string): string {
    if (!process.env[item])
      throw new Error(`No such environment variable: ${item}`);
    return process.env[item]!;
  }

  public static getOptional(item: string, alt: any): any {
    return process.env[item] || alt;
  }

  public static isSet(item: string): boolean {
    return process.env[item] !== undefined;
  }
}
