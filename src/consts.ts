import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// global consts
const __dirname: string = dirname(fileURLToPath(import.meta.url));
export const questionsFilePath: string = join(__dirname, "questions.json");
export const lives: number = 3;
