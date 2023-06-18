import gradient from "gradient-string";
import figlet from "figlet";
import inquirer from "inquirer";
import chalk from "chalk";
import dedent from "../utils/dedent";
import { MenuOption, MenuOptions } from "../types/menu";

export function showMenuBanner() {
    const menuBanner = figlet.textSync("QUIZ-GAME", {
        font: "Larry 3D 2",
        horizontalLayout: "default",
        verticalLayout: "full",
        width: 100,
        whitespaceBreak: false,
    });

    console.log(gradient.pastel(menuBanner));
}

export async function showMainMenuOptions(): Promise<MenuOption> {
    const options = Object.keys(MenuOption).filter((v) => isNaN(Number(v))) as MenuOptions[];

    const response = await inquirer.prompt([
        {
            type: "list",
            name: "opcion",
            message: "¿Ready?",
            choices: options,
        },
    ]);

    return response.opcion;
}

export function welcome() {
    console.log(dedent`
		${chalk.bgBlack.underline.whiteBright("HOW TO PLAY")} 
		I am a process on your computer.
		If you loose your 3 lives, I will be ${chalk.red("killed")}!
		So get all the questions right...
	`);
}

export function showCredits() {
    const authorColor = chalk.hex("#54a7c7");
    console.log(dedent`
        ${authorColor("Author: Constantino Edes")}
        Version: 1.0.0`
    );
}
