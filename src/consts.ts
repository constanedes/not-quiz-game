import { DependencyCollection } from "@miracledevs/paradigm-web-di";
import { join } from "path";

// global consts
export const questionsFilePath: string = join(__dirname, "questions.json");
export const lives: number = 3;
export const container = DependencyCollection.globalCollection.buildContainer();
