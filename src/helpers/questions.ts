import { DependencyCollection } from "@miracledevs/paradigm-web-di";
import IQuestion from "../interfaces/IQuestion";
import FileStorageService from "../services/FileStorageService";
import inquirer from "inquirer";
import chalk from "chalk";
import { lives, questionsFilePath } from "../consts";
import { getRandomNumber } from "../utils/others";

const container = DependencyCollection.globalCollection.buildContainer();

export default function getQuestions(path: string) {
    const fileStorageService = container.resolve(FileStorageService);
    const allQuestionsObject = fileStorageService.readJsonFile(path, true) as IQuestion[];
    return new Map<number, IQuestion>(allQuestionsObject.map((e: IQuestion, index: number) => [index, e]));
}

async function getRandomQuestion(): Promise<IQuestion | undefined> {
    if (lives === 0) {
        process.exit(1);
    }
    const data = getQuestions(questionsFilePath);
    const randomIndex = getRandomNumber(0, data.size);
    return data.get(randomIndex);
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
