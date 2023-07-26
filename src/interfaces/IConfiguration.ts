import { GameDifficulty, GameMode, IntRange } from "../types/Configuration.js";

export interface IConfiguration {
    lives: number;
    dificulty: GameDifficulty;
    topic: IntRange<9, 32>;
    questions: number;
    mode: GameMode;
}

// For view all topics check https://opentdb.com/api_category.php
