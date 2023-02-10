#!/usr/bin/env node
import fs from "fs/promises";
// import chalkAnimation from "chalk-animation";
import { join, dirname } from "path";
import chalk from "chalk";
import ora from "ora";
import { fileURLToPath } from 'url';
import inquirer from "inquirer";

interface IQuestion {
    id: number;
    title: string;
    correct: number;
    options: string[];
}

const __dirname: string = dirname(fileURLToPath(import.meta.url));
let lives: number = 3;

function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

async function getQuestions() {
    const allQuestionsObject = JSON.parse(
        await fs.readFile(join(__dirname, '..', 'src', '/questions.json'), 'utf-8')
    ) as IQuestion[];
	return new Map<number, IQuestion>(allQuestionsObject.map((e: IQuestion, index: number) => [index, e]));
}

async function getRandomQuestion() {
    if (lives === 0) {
        process.exit(1);
    }
	const data = await getQuestions();
	const randomIndex = Math.floor(Math.random() * data.size);
	return data.get(randomIndex)!
}

async function welcome() {
    /* const rainbowTitle = chalkAnimation.rainbow(
      "Welcome to the best quiz game! \n"
    ).start()

    rainbowTitle.stop() */

    console.log(`
		${chalk.bgBlack.overline.whiteBright("HOW TO PLAY")} 
		I am a process on your computer.
		If you loose your 3 lives, I will be ${chalk.red("killed")}!
		So get all the questions right...
	`);
}

async function viewNextQuestionOptions(question: IQuestion){
    let propmts = [
        {
            type: 'list',
            name: question.title,
            message: "Your answer",
            choices: question.options,
            prefix: `${chalk.magenta("-")}`,
            suffix: `:${chalk.magenta(" -")}${chalk.greenBright(" You got options, choose wisely!")}` 
        }
    ]

    inquirer.prompt(propmts)
    .then((answer) => {
        handleAnswer(question, answer[question.title]) // answer[question.title]
    })
    .catch((err) => {
        console.error(err)
    })
}


async function handleAnswer(question: IQuestion, userAnswer: string){

    const spinner = ora({
        color: "green",
        text: "Checking answer",
        
    }).start();

    await sleep(2000);
    
    spinner.stop();

    if (question["options"][question.correct] === userAnswer){
        
        spinner.succeed("Correct")
        //spinner.info(`You got ${lives} lives, and ${} of ${} questions`)
    }
    else {
        spinner.fail("Incorrect...");
        process.exit(1);
    }
}

async function main() {
    await sleep(100);
    welcome();
    viewNextQuestionOptions(await getRandomQuestion());
    
}

main();
