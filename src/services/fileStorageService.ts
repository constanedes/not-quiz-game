import fs from "fs";
import LoggerService from "./loggerService";
import { IFileStorageService } from "../interfaces/IFileStorageService";
import { JsonObject } from "../types/json";

export default class FileStorageService implements IFileStorageService {
    private static instance: FileStorageService;
    private logger: LoggerService;

    constructor(logger: LoggerService) {
        this.logger = logger;
    }

    static getInstance(): FileStorageService {
        if (!FileStorageService.instance) {
            FileStorageService.instance = new FileStorageService(LoggerService.getInstance());
        }
        return FileStorageService.instance;
    }

    readJsonFile(filePath: string, parse: boolean): string | unknown {
        try {
            const fileContent = fs.readFileSync(filePath, "utf-8");
            if (parse) return JSON.parse(fileContent);
            return fileContent;
        } catch (err) {
            throw new Error(`Error when reading file: ${err}`);
        }
    }

    createFile(filePath: string): void {
        try {
            fs.closeSync(fs.openSync(filePath, "a+"));
        } catch (err) {
            throw new Error(`Error when creating file: ${err}`);
        }
    }

    checkFileExists(filepath: string): boolean {
        try {
            return fs.existsSync(filepath);
        } catch (err) {
            throw new Error(`Error when checking file existence: ${err}`);
        }
    }

    addObjectToJson(filePath: string, jsonData: JsonObject): void {
        try {
            const jsonObject = JSON.stringify(jsonData, null, 4);
            fs.appendFileSync(filePath, jsonObject, "utf-8");
        } catch (err) {
            throw new Error(`Error when appending JSON object to file: ${err}`);
        }
    }
}
