import { DependencyCollection, DependencyContainer } from "@miracledevs/paradigm-web-di";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname: string = dirname(fileURLToPath(import.meta.url));
// global consts

export const questionsFilePath: string = join(__dirname, "questions.json");
export const lives: number = 3;
export const container: DependencyContainer = DependencyCollection.globalCollection.buildContainer();
