import { GameDifficulty, GameMode } from "../types/Configuration.js";

export interface IQuestion {
    category: string;
    type: GameMode;
    difficulty: GameDifficulty;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}

export interface IParsedQuestion {
    name: string;
    question: string;
    options: string[];
    answer: string;
}
