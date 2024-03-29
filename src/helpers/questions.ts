import { defaultConfig } from "../consts.js";
import { IConfiguration } from "../interfaces/IConfiguration.js";
import { IParsedQuestion, IQuestion } from "../interfaces/IQuestion.js";
import { clamp, getApiData, shuffleArray } from "../utils.js";
import { logger } from "./logger.js";
import chalk from "chalk";
import { decode } from "html-entities";
import inquirer from "inquirer";

export async function askName(): Promise<string> {
    const answers = await inquirer.prompt({
        name: "player_name",
        type: "input",
        message: "Lets start! What is your name?",
        default() {
            return "Player";
        },
        validate: (name: string) => {
            if (name.trim().length === 0 || !/^[a-zA-Z0-9_]+$/.test(name)) {
                return "invalid name, use only alphanumeric characters";
            }
            return true;
        },
    });
    return answers.player_name;
}

export async function getQuestions(config: IConfiguration) {
    try {
        const extractedQuestions = await getApiData("https://opentdb.com/api.php", {
            amount: clamp(config.questions, 3, 20) ?? defaultConfig.questions,
            category: clamp(config.topic, 9, 32) ?? defaultConfig.topic,
            difficulty: config.difficulty ?? defaultConfig.difficulty,
            type: config.mode ?? defaultConfig.mode,
        });

        const map = new Map<number, IQuestion>(
            shuffleArray<IQuestion>(extractedQuestions.results).map((e: IQuestion, index: number) => [index, e])
        );

        if (!map || map.size === 0) throw new Error();
        return map;
    } catch (error) {
        logger.error("Cant fetch the questions, check your game config parameters and try again.", error);
    }
}

export function createQuestion(questions: Map<number, IQuestion>): IParsedQuestion {
    const question = questions.get(questions.size - 1)!;
    const name = `${question.category[0].toLowerCase()}${question.difficulty[0]}`;
    const options = [...question.incorrect_answers.map(q => decode(q)), decode(question.correct_answer)];

    return { name, question: question.question, options, answer: question.correct_answer };
}

export async function askQuestion(question: IParsedQuestion) {
    const answers = await inquirer.prompt({
        name: question.name,
        type: "list",
        message: decode(question.question),
        choices: shuffleArray(question.options),
        suffix: `${chalk.magenta(" -")}${chalk.greenBright(" You got options, choose wisely")}`,
    });

    return answers[question.name];
}
