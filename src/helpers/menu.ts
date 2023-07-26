import { IMenuItem } from "../interfaces/IMenuItem.js";
import { MainMenuOption } from "../types/MainMenu.js";
import figlet from "figlet";
import gradient from "gradient-string";
import inquirer from "inquirer";
import process from "node:process";
import { BANNER_TEXT, CREDITS_TEXT, EXIT_TEXT, WELCOME_TEXT } from "../consts.js";

export function showMenuBanner(): void {
    const menuBanner = figlet.textSync(BANNER_TEXT, {
        font: "Larry 3D 2",
        horizontalLayout: "default",
        verticalLayout: "full",
        width: 100,
        whitespaceBreak: false,
    });

    console.log(gradient.pastel(menuBanner));
}

export function welcome() {
    console.log(WELCOME_TEXT);
}

export function showCredits() {
    console.log(CREDITS_TEXT);
}

export function exitGame(): void {
    console.log(EXIT_TEXT);
    process.exit(0);
}

export async function executeMainMenuOption(menu: IMenuItem[]): Promise<IMenuItem | undefined> {
    const options = Object.values(MainMenuOption);
    const response = await inquirer.prompt([
        {
            type: "list",
            name: "option",
            message: "¿Ready?",
            choices: options,
        },
    ]);

    const selectedItem = menu.find((item) => item.name === response.option);
    if (selectedItem?.action) await selectedItem.action();
    return selectedItem;
}

export async function playGame(): Promise<void> {
    console.log();
}
