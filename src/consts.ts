import chalk from "chalk";
import { exitGame, showCredits } from "./helpers/menu.js";
import { IMenuItem } from "./interfaces/IMenuItem.js";
import { MainMenuOption } from "./types/MainMenu.js";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import dedent from "./utils.js";

export const bannerText = "!QUIZ-GAME";

export const welcomeText = dedent`
${chalk.bgBlack.underline.whiteBright("HOW TO PLAY")} 
I am a process on your computer.
If you loose your 3 lives, I will be ${chalk.red("killed")}!
So get all the questions right...
`;

export const gameOverText = "Game over, try again :/";
export const winText = "You win the game! Contrats!!";
export const creditsText = dedent`
${chalk.cyanBright("Author: Constantino Edes")}
Version: 0.1.5`;
export const exitText = dedent`
${chalk.gray("See you soon!")} 👋
Exiting game...
`;

/* export const __dirname: string = dirname(fileURLToPath(import.meta.url));
export const questionsFilePath: string = join(__dirname, "questions.json"); */

export const gameOptions: IMenuItem[] = [
    {
        name: MainMenuOption.Play,
        action: async () => showCredits(),
    },
    {
        name: MainMenuOption.Credits,
        action: async () => {
            console.log("Mostrando los créditos del juego");
            // Lógica para mostrar los créditos del juego
        },
    },
    {
        name: MainMenuOption.Exit,
        action: async () => showCredits(),
    },
];
