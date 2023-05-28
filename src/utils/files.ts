import fs from "fs/promises";

export function checkFileExistsSync(filepath: string) {
    let flag = true;
    try {
        fs.access(filepath);
    } catch (e) {
        flag = false;
    }
    return flag;
}

// rome-ignore lint/suspicious/noExplicitAny: <explanation>
async  function appendToJsonFile(filePath: string, jsonData: any): Promise<void> {
    try {
        const jsonString = JSON.stringify(jsonData);
        await fs.appendFile(filePath, jsonString, "utf-8");
    } catch (err) {
        console.error("Error:", err);
    }
}
