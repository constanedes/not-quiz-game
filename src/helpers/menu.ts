import { IMenuItem } from "../interfaces/IMenuItem.js";
import { MenuOption } from "../types/Menu.js";
import figlet from "figlet";
import gradient from "gradient-string";
import inquirer from "inquirer";
import process from "node:process";
import { BANNER_TEXT, CREDITS_TEXT, EXIT_TEXT, WELCOME_TEXT, defaultConfig } from "../consts.js";
import { askQuestion, getQuestions } from "./questions.js";
import { IConfiguration } from "../interfaces/IConfiguration.js";

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
    const options = Object.values(MenuOption);
    const response = await inquirer.prompt([
        {
            type: "list",
            name: "option",
            prefix: "",
            suffix: "",
            message: "¿Ready?",
            choices: options,
        },
    ]);

    const selectedItem = menu.find((item: IMenuItem) => item.name === response.option);
    if (selectedItem?.action) await selectedItem.action();
    return selectedItem;
}

export async function playGame(config: IConfiguration): Promise<void> {
    const allQuestionsMap = await getQuestions(config);
    // rome-ignore lint/style/useConst: <explanation>
    let corrects = 0;
    console.log(await askQuestion(allQuestionsMap));
}
