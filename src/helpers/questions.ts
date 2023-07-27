import { IQuestion } from "../interfaces/IQuestion.js";
import { decode } from "html-entities";
import inquirer from "inquirer";
import ora from "ora";
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

export async function getQuestions(config: IConfiguration): Promise<Map<number, IQuestion>> {
    try {
        const extractedQuestions = await getApiData("https://opentdb.com/api.php", {
            amount: config.questions ?? defaultConfig.questions,
            category: clamp(config.topic, 9, 32) ?? defaultConfig.topic,
            difficulty: config.difficulty ?? defaultConfig.difficulty,
            type: config.mode ?? defaultConfig.mode,
        });

        return new Map<number, IQuestion>(
            shuffleArray<IQuestion>(extractedQuestions.results).map((e: IQuestion, index: number) => [index, e])
        );
    } catch (error) {
        logger.error(error);
        return new Map();
    }
}

function createQuestion(questions: Map<number, IQuestion>) {
    const questionIndex = Math.floor(Math.random() * questions.size);
    const question = questions.get(questionIndex);

    if (question) {
        const name = `${question.category[0].toLowerCase()}${question.difficulty[0]}${questionIndex}`;
        const options = [...question.incorrect_answers.map((q: string) => decode(q)), decode(question.correct_answer)];
        return { name, question: question.question, options, answer: question.correct_answer, index: questionIndex };
    } else {
        throw new Error("Cant build the question");
    }
}

export async function askQuestion(questions: Map<number, IQuestion>) {
    const question = createQuestion(questions);
    const answers = await inquirer.prompt({
        name: question.name,
        type: "list",
        message: decode(question.question),
        choices: shuffleArray(question.options),
    });

    //questions.delete(question.index);
    console.log(questions);
    return answers[question.name] === decode(question.answer);
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
} */

/* const handleAnswer = async (isCorrect) => {
    const spinner = createSpinner("Checking answer...").start();
    await sleep(100);

    if (isCorrect) {
        correctAnswers++;
        if (correctAnswers % gameConfig.extraLifeOn === 0) {
            lives++;
            spinner.success({
                text: `Great work. That gave me another life. ${getLives(lives)}`,
            });
        } else {
            spinner.success({ text: `Well done. That's the correct answer` });
        }
    } else {
        lives--;
        if (lives === 0) {
            spinner.error({
                text: `${getMurderWeapon()} Game over, thanks for nothing! 💀💀💀`,
            });
            process.exit(0);
        }
        spinner.error({
            text: `Wow that was close! Please do better next question! They attempt to kill me with a ${getMurderWeapon()}. I only have ${getLives(
                lives
            )}`,
        });
    }
};
 */
