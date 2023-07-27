import chalk from "chalk";
import { executeMainMenuOption, exitGame, playGame, showCredits } from "./helpers/menu.js";
import { IMenuItem } from "./interfaces/IMenuItem.js";
import { MenuOption } from "./types/Menu.js";
import dedent, { getVersion } from "./utils.js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { IConfiguration } from "./interfaces/IConfiguration.js";
import { config } from "./index.js";

const __filename = fileURLToPath(import.meta.url);
const distPath = path.dirname(__filename);
export const PKG_ROOT = path.join(distPath, "../");

export const GAME_NAME = "not-quiz-game";
export const BANNER_TEXT = "!QUIZ-GAME";
export const WELCOME_TEXT = dedent`
${chalk.bgBlack.underline.whiteBright("HOW TO PLAY")} 
I am a process on your computer.
If you loose your 3 lives, I will be ${chalk.red("killed")}!
So get all the questions right...
`;
export const LOSE_TEXT = "Game over, try again :/";
export const WIN_TEXT = "You win the game! Contrats!!";
export const CREDITS_TEXT = dedent`
${chalk.cyanBright("Author: Constantino Edes")}
Version: ${getVersion()}`;
export const EXIT_TEXT = dedent`
${chalk.gray("See you soon!")} 👋
Exiting game...
`;

export const gameOptions: IMenuItem[] = [
    {
        name: MenuOption.Play,
        action: async () => playGame(config),
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
    topic: 9,
    questions: 10,
    mode: "multiple",
} as const;
