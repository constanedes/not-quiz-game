import { JsonObject } from "type-fest";

export interface IFileStorageService {
    readJsonFile(filePath: string, parse: boolean): string | unknown;
    createFile(filePath: string): void;
    checkFileExists(filepath: string): boolean;
    addObjectToJson(filePath: string, jsonData: JsonObject): void;
}
