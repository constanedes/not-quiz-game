import { IParsedQuestion, IQuestion } from "../interfaces/IQuestion.js";
import { decode } from "html-entities";
import inquirer from "inquirer";
import { clamp, getApiData, shuffleArray } from "../utils.js";
import { IConfiguration } from "../interfaces/IConfiguration.js";
import { defaultConfig } from "../consts.js";
import { logger } from "./logger.js";

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
            amount: config.questions ?? defaultConfig.questions,
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
    // rome-ignore lint/style/noNonNullAssertion: <explanation>
    const question = questions.get(questions.size - 1)!;

    const name = `${question.category[0].toLowerCase()}${question.difficulty[0]}`;
    const options = [...question.incorrect_answers.map((q: string) => decode(q)), decode(question.correct_answer)];
    return { name, question: question.question, options, answer: question.correct_answer };
}

export async function askQuestion(question: IParsedQuestion) {
    const answers = await inquirer.prompt({
        name: question.name,
        type: "list",
        message: decode(question.question),
        choices: shuffleArray(question.options),
    });

    return answers[question.name];
}

/* async function viewNextQuestionOptions(question: IQuestion) {
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
*/

/* async function handleAnswer(isCorrect: boolean) {
    const spinner = ora({
        color: "green",
        text: "Checking answer",
    }).start();

    spinner.stop();
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
*/
