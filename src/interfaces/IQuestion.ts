import { GameDificulty, QuestionType } from "../types/Configuration.js";

export interface IQuestion {
    category: string;
    type: QuestionType;
    dificulty: GameDificulty;
    title: string;
    correct: string;
    incorrects: string[];
}
