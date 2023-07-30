import { IMenuItem } from "../interfaces/IMenuItem.js";
import { MenuOption } from "../types/Menu.js";
import figlet from "figlet";
import gradient from "gradient-string";
import inquirer from "inquirer";
import process from "node:process";
import { BANNER_TEXT } from "../consts.js";
import { askQuestion, createQuestion, getQuestions } from "./questions.js";
import { IConfiguration } from "../interfaces/IConfiguration.js";
import ora from "ora";
import { decode } from "html-entities";
import { dedent, getVersion, sleep } from "../utils.js";
import chalk from "chalk";
import { logger } from "./logger.js";

export function showMenuBanner(): void {
    console.log(dedent`
        ${chalk.bgBlack.underline.whiteBright("HOW TO PLAY")} 
        I am a process on your computer.
        If you loose your 3 lives, I will be ${chalk.red("killed")}!
        So get all the questions right...
    `);
    const menuBanner = figlet.textSync(BANNER_TEXT, {
        font: "Larry 3D 2",
        horizontalLayout: "default",
        verticalLayout: "full",
        width: 100,
        whitespaceBreak: false,
    });
    console.log(gradient.pastel(menuBanner));
}

export function showCredits(): void {
    console.log(dedent`
    ${chalk.cyanBright("Author: Constantino Edes")}
    Version: ${getVersion()}`);
}

export function exitGame(): void {
    console.log();
    process.exit(0);
}

async function winGame(playerName: string) {
    console.log(playerName);
    console.log("win");
    // TODO: Implement a countdown function to show the credits
    await sleep(2000);
    showCredits();
}

function looseGame() {
    console.log("you loose try again");
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

export async function playGame(config: IConfiguration, playerName: string): Promise<void> {
    const loadingSpinner = ora({
        color: "cyan",
        text: "Obtaining questions\n",
    }).start();
    const allQuestionsMap = await getQuestions(config);

    let corrects = 0;
    const lives = [1, 2, 3];
    loadingSpinner.stop();

    while (true) {
        if (corrects === config.questions || lives.length === 0) {
            if (corrects === config.questions) {
                winGame(playerName);
            }
            if (lives.length === 0) {
                looseGame();
            }
            break;
        }
        if (!allQuestionsMap) return;
        const questionToAsk = createQuestion(allQuestionsMap);
        const userAnswer = await askQuestion(questionToAsk);
        const spinner = ora({
            color: "white",
            text: "Checking answer",
        }).start();
        await sleep(150);

        if (userAnswer === decode(questionToAsk.answer)) {
            spinner.succeed("Correect");
            corrects++;
        } else {
            spinner.fail("Incorrect");
            lives.pop();
            continue;
        }
        logger.debug(allQuestionsMap);
        allQuestionsMap.delete(allQuestionsMap.size - 1);
        spinner.info(`You got ${lives.length} lives, and ${allQuestionsMap.size} questions`);
    }
}
