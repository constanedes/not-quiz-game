import { BANNER_TEXT, GAME_NAME } from "../consts.js";
import { IConfiguration } from "../interfaces/IConfiguration.js";
import { IMenuItem } from "../interfaces/IMenuItem.js";
import { MenuOption } from "../types/Menu.js";
import { clamp, dedent, getVersion, sleep } from "../utils.js";
import { askQuestion, createQuestion, getQuestions } from "./questions.js";
import chalk from "chalk";
import figlet from "figlet";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import { decode } from "html-entities";
import inquirer from "inquirer";
import process from "node:process";
import ora from "ora";

export function showMenuBanner(): void {
    console.log(dedent`
        ${chalk.bgBlack.underline.whiteBright("HOW TO PLAY")} 
        I am a process on your computer.
        If you loose your 3 lives, I will be ${chalk.red("killed")} ❌
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
        ${chalk.cyanBright("Author: Constantino Edes 👨‍💻")}
        Version: ${getVersion()}
        Thank you for playing❕
        ${GAME_NAME} © 2023
    `);
}

export function exitGame(): void {
    console.log("See you soon 👋");
    process.exit(0);
}

async function winGame(playerName: string) {
    console.log(dedent`
        Congratulations ${playerName} on your remarkable victory in the game 👏
    `);
    chalkAnimation.rainbow("The process is free now ‼️");
    await sleep(2000);

    showCredits();
    exitGame();
}

function looseGame(playerName: string) {
    console.log(dedent`
        Game Over ${playerName}, try again 😭
        ${chalk.underline.red("The process will be killed...")}
    `);

    exitGame();
}

export async function executeMainMenuOption(menu: IMenuItem[]): Promise<void> {
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
}

export async function playGame(config: IConfiguration, playerName: string): Promise<void> {
    const loadingSpinner = ora({
        color: "cyan",
        text: "Obtaining questions\n",
        hideCursor: true,
    }).start();

    let corrects = 0;
    const allQuestionsMap = await getQuestions(config);
    const lives = new Array(clamp(config.lives, 1, 10)).fill("❤️");
    loadingSpinner.stop();

    while (true) {
        if (corrects === config.questions || lives.length === 0) {
            if (corrects === config.questions) {
                winGame(playerName);
            }
            if (lives.length === 0) {
                looseGame(playerName);
            }
            break;
        }

        if (!allQuestionsMap) {
            winGame(playerName);
            return;
        }

        const questionToAsk = createQuestion(allQuestionsMap);
        const userAnswer = await askQuestion(questionToAsk);
        const spinner = ora({
            color: "white",
            text: "Checking answer",
            spinner: "triangle",
            hideCursor: true,
        }).start();

        // Time between questions
        await sleep(200);

        if (userAnswer === decode(questionToAsk.answer)) {
            spinner.succeed("Correct ✔️");
            corrects++;
        } else {
            spinner.fail("Incorrect ✖️");
            lives.pop();
            continue;
        }

        allQuestionsMap.delete(allQuestionsMap.size - 1);
        spinner.info(
            `You got ${lives.map(x => x)} (${lives.length}) lives, and ${allQuestionsMap.size} questions left\n`
        );
    }
}
