import { GameDifficulty, GameMode } from "../types/Configuration.js";

export interface IConfiguration {
    lives: number;
    difficulty: GameDifficulty;
    topic: number;
    questions: number;
    mode: GameMode;
    debug?: boolean;
}

// For view all topics check https://opentdb.com/api_category.php
