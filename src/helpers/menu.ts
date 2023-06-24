import gradient from "gradient-string";
import figlet from "figlet";
import inquirer from "inquirer";
import chalk from "chalk";
import dedent from "../utils/dedent.js";
import { MainMenuOption } from "../types/MainMenu.js";
import process from "node:process";
import { MenuItem } from "../interfaces/IMenuItem.js";

export function showMenuBanner(): void {
    const menuBanner = figlet.textSync("!QUIZ-GAME", {
        font: "Larry 3D 2",
        horizontalLayout: "default",
        verticalLayout: "full",
        width: 100,
        whitespaceBreak: false,
    });

    console.log(gradient.pastel(menuBanner));
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
    console.log(dedent`
        ${chalk.cyanBright("Author: Constantino Edes")}
        Version: 0.1.5`);
}

export function exitGame(): void {
    console.log(dedent`${chalk.gray("See you soon!")} 👋
        Exiting game...
    `);
    process.exit(0);
}

export async function showMainMenuOptions(): Promise<MainMenuOption> {
    const options = Object.values(MainMenuOption);
    const response = await inquirer.prompt([
        {
            type: "list",
            name: "opcion",
            message: "¿Ready?",
            choices: options,
        },
    ]);
    return response.opcion as MainMenuOption;
}

export async function evalOption(menu: MenuItem): Promise<void> {
    const history: MenuItem[] = [];
    let previousMenu: MenuItem | undefined;
    let selectedOption: string | undefined;

    while (selectedOption !== MainMenuOption.Exit) {
        const choices = menu.submenu?.map((item) => item.name);
        /* if (menu?.back && history.length > 0) {
            previousMenu = history.pop();
            const backOption = `Volver al ${previousMenu?.name}`;
            choices.push(backOption);
        } */
        const response = await inquirer.prompt([
            {
                type: "list",
                name: "option",
                message: "Select an option:",
                choices,
            },
        ]);

        const selectedOption = response.option;

        const selectedItem = menu.submenu?.find((item) => item.name === selectedOption);

        if (selectedItem?.action) {
            await selectedItem.action();
        } else if (selectedItem?.submenu) {
            await evalOption(selectedItem);
        }
    }
}
