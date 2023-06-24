export function readJsonFile(filePath: string, parse: boolean): string | unknown {
    try {
        const fileContent = fs.readFileSync(filePath, "utf-8");
        if (parse) return JSON.parse(fileContent);
        return fileContent;
    } catch (err) {
        this.logger.error(`Error when reading file: ${err}`);
    }
}

export function createFile(filePath: string): void {
    try {
        fs.closeSync(fs.openSync(filePath, "a+"));
    } catch (err) {
        this.logger.error(`Error when creating file: ${err}`);
    }
}

export function checkFileExists(filepath: string): boolean {
    try {
        return fs.existsSync(filepath);
    } catch (err) {
        this.logger.error(`Error when checking file existence: ${err}`);
        return false;
    }
}

export function addObjectToJson(filePath: string, jsonData: JsonObject): void {
    try {
        const jsonObject = JSON.stringify(jsonData, null, 4);
        fs.appendFileSync(filePath, jsonObject, "utf-8");
    } catch (err) {
        this.logger.error(`Error when appending JSON object to file: ${err}`);
    }
}
