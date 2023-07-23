import { GameDificulty, IntRange, QuestionType } from "../types/Configuration.js";

export interface IConfiguration {
    lives: number;
    difuculty: GameDificulty;
    topic: IntRange<9, 32>;
    questionsToWin: number;
    questionsType: QuestionType;
}

// For view all topics check https://opentdb.com/api_category.php
