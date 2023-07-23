import { IQuestion } from "../interfaces/IQuestion.js";
import chalk from "chalk";
import { readJSONSync } from "fs-extra";
import inquirer from "inquirer";

export default function getQuestions(path: string) {
    const allQuestionsObject = readJSONSync(path) as IQuestion[];
    return new Map<number, IQuestion>(allQuestionsObject.map((e: IQuestion, index: number) => [index, e]));
}

/* async function getRandomQuestion(): Promise<IQuestion | undefined> {
    const data = getQuestions(questionsFilePath);
    const randomIndex = getRandomNumber(0, data.size);
    return data.get(randomIndex);
} */

async function viewNextQuestionOptions(question: IQuestion) {
    const propmts = [
        {
            type: "list",
            name: question.title,
            message: "Your answer",
            choices: question.incorrects,
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

function handleAnswer(question: IQuestion, arg1: unknown) {
    throw new Error("Function not implemented.");
}
/* async function handleAnswer(question: IQuestion, userAnswer: string) {
     const spinner = ora({
        color: "green",
        text: "Checking answer",
    }).start();
    
     spinner.stop(); */
/* if (question["options"][question.correct] === userAnswer) {
        //spinner.succeed("Correct");
        console.log("correct");
        console.log(userAnswer);

        //spinner.info(`You got ${lives} lives, and ${} of ${} questions`)
    } else {
        //spinner.fail("Incorrect...");
        process.exit(1);
    }  */
