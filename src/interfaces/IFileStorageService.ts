import { JsonObject } from "../types/json";

export interface IFileStorageService {
    readJsonFile(filePath: string, parse: boolean): string | unknown;
    createFile(filePath: string): void;
    checkFileExists(filepath: string): boolean;
    addObjectToJson(filePath: string, jsonData: JsonObject): void;
}
