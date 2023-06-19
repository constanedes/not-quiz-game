import fs from "node:fs";
import { IFileStorageService } from "../interfaces/IFileStorageService.js";
import { JsonObject } from "type-fest";
import LoggerService from "./loggerService.js";

export default class FileStorageService implements IFileStorageService {
    logger: LoggerService;

    public constructor() {
        this.logger = new LoggerService();
    }

    readJsonFile(filePath: string, parse: boolean): string | unknown {
        try {
            const fileContent = fs.readFileSync(filePath, "utf-8");
            if (parse) return JSON.parse(fileContent);
            return fileContent;
        } catch (err) {
            this.logger.error(`Error when reading file: ${err}`);
        }
    }

    createFile(filePath: string): void {
        try {
            fs.closeSync(fs.openSync(filePath, "a+"));
        } catch (err) {
            this.logger.error(`Error when creating file: ${err}`);
        }
    }

    checkFileExists(filepath: string): boolean {
        try {
            return fs.existsSync(filepath);
        } catch (err) {
            this.logger.error(`Error when checking file existence: ${err}`);
            return false;
        }
    }

    addObjectToJson(filePath: string, jsonData: JsonObject): void {
        try {
            const jsonObject = JSON.stringify(jsonData, null, 4);
            fs.appendFileSync(filePath, jsonObject, "utf-8");
        } catch (err) {
            this.logger.error(`Error when appending JSON object to file: ${err}`);
        }
    }
}
