import chalk from "chalk";
import { executeMainMenuOption, exitGame, playGame, showCredits } from "./helpers/menu.js";
import { IMenuItem } from "./interfaces/IMenuItem.js";
import { MainMenuOption } from "./types/MainMenu.js";
import dedent from "./utils.js";
import path from "node:path";
import { fileURLToPath } from "node:url";

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
Version: 0.1.5`;
export const EXIT_TEXT = dedent`
${chalk.gray("See you soon!")} 👋
Exiting game...
`;

const __filename = fileURLToPath(import.meta.url);
const distPath = path.dirname(__filename);
export const PKG_ROOT = path.join(distPath, "../");

export const gameOptions: IMenuItem[] = [
    {
        name: MainMenuOption.Play,
        action: async () => playGame(),
    },
    {
        name: MainMenuOption.Credits,
        action: async () => {
            showCredits();
            await executeMainMenuOption(gameOptions);
        },
    },
    {
        name: MainMenuOption.Exit,
        action: async () => exitGame(),
    },
];
