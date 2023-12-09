import { executeMainMenuOption, exitGame, playGame, showCredits } from "./helpers/menu.js";
import { askName } from "./helpers/questions.js";
import { config } from "./index.js";
import { IConfiguration } from "./interfaces/IConfiguration.js";
import { IMenuItem } from "./interfaces/IMenuItem.js";
import { MenuOption } from "./types/Menu.js";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const distPath = path.dirname(__filename);
export const PKG_ROOT = path.join(distPath, "..", "..");

export const GAME_NAME = "not-quiz-game";
export const BANNER_TEXT = "!QUIZ-GAME";

export const gameOptions: IMenuItem[] = [
    {
        name: MenuOption.Play,
        action: async () => {
            const playerName = await askName();
            playGame(config, playerName);
        },
    },
    {
        name: MenuOption.Credits,
        action: async () => {
            showCredits();
            await executeMainMenuOption(gameOptions);
        },
    },
    {
        name: MenuOption.Exit,
        action: async () => exitGame(),
    },
];

export const defaultConfig: IConfiguration = {
    lives: 3,
    difficulty: "medium",
    topic: 18,
    questions: 10,
    mode: "multiple",
} as const;
