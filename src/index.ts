#!/usr/bin/env node
import { join } from "path";
import chalk from "chalk";
import dedent from "./utils/dedent";
import inquirer from "inquirer";
import IQuestion from "./interfaces/IQuestion";
import LoggerService from "./services/loggerService";
import FileStorageService from "./services/fileStorageService";
import getQuestions from "./helpers/questions";
import { showMenuBanner } from "./helpers/menu";

// global variables
const questionsFilePath: string = join(__dirname, "questions.json");
const lives: number = 3;

function getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const data = [
    {
        id: 0,
        title: "What is JavaScript",
        correct: 0,
        options: ["Programming Language", "A toaster", "A software application"],
    },
    {
        id: 1,
        title: "What is Typescript",
        correct: 2,
        options: ["Idk", "A unicorn", "A superset of JavaScript"],
    },
];

function gameOver(): void {
    console.log("You lost");
    process.exit(0);
}

async function getRandomQuestion(): Promise<IQuestion | undefined> {
    if (lives === 0) {
        process.exit(1);
    }
    const data = await getQuestions(questionsFilePath);
    const randomIndex = getRandomNumber(0, data.size);
    return data.get(randomIndex);
}

function welcome() {
    showMenuBanner();

    console.log(dedent`
		${chalk.bgBlack.underline.whiteBright("HOW TO PLAY")} 
		I am a process on your computer.
		If you loose your 3 lives, I will be ${chalk.red("killed")}!
		So get all the questions right...
	`);
}

async function viewNextQuestionOptions(question: IQuestion) {
    const propmts = [
        {
            type: "list",
            name: question.title,
            message: "Your answer",
            choices: question.options,
            prefix: `${chalk.magenta("-")}`,
            suffix: `:${chalk.magenta(" -")}${chalk.greenBright(" You got options, choose wisely!")}`,
        },
    ];

    inquirer
        .prompt(propmts)
        .then((answer) => {
            handleAnswer(question, answer[question.title]); // answer[question.title]
        })
        .catch((err) => {
            console.error(err);
        });
}

async function handleAnswer(question: IQuestion, userAnswer: string) {
    /*  const spinner = ora({
        color: "green",
        text: "Checking answer",
    }).start();
    */
    /* spinner.stop(); */

    if (question["options"][question.correct] === userAnswer) {
        //spinner.succeed("Correct");
        console.log("correct");
        console.log(userAnswer);

        //spinner.info(`You got ${lives} lives, and ${} of ${} questions`)
    } else {
        //spinner.fail("Incorrect...");
        process.exit(1);
    }
}

async function main() {
    welcome();
    console.log(questionsFilePath);
    const nextQuestion = await getRandomQuestion();
    if (nextQuestion) {
        viewNextQuestionOptions(nextQuestion);
    } 
}

main();
