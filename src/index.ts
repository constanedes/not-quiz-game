#!/usr/bin/env node
import fs from "fs/promises";
import { join } from "path";
import chalk from "chalk";
import dedent from "./utils/dedent";

const questionsFilePath: string = join(__dirname, "questions.json");

interface Question {
    title: string;
    correct: string;
    options: string[];
}

function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

async function getQuestions(): Promise<Question[]> {
    return JSON.parse(await fs.readFile(questionsFilePath, "utf-8"));
}

async function getRandomQuestion() {
    const data = await getQuestions();
    const randomIndex = Math.floor(getRandomNumber(0, data.length));
    return data[randomIndex];
}

async function welcome() {
    /* const rainbowTitle = chalkAnimation.rainbow(
		"Welcome to the best quiz game! \n",
	);
	rainbowTitle.stop(); */

    console.log(dedent`
        ${chalk.bgBlue("HOW TO PLAY")} 
        I am a process on your computer.
        If you get any question wrong I will be ${chalk.bgRed("killed")}
        So get all the questions right...
	`);
}

function main(): void {
    welcome();
}

main();

