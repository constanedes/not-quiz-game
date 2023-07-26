#!/usr/bin/env node
import { Command, Option } from "@commander-js/extra-typings";
import { gameOptions } from "./consts.js";
import { logger } from "./helpers/logger.js";
import { executeMainMenuOption, showMenuBanner, welcome } from "./helpers/menu.js";
import { IConfiguration } from "./interfaces/IConfiguration.js";
import { getApiData, getVersion, isDebugging } from "./utils.js";

function initialDebug() {
    logger.info("App running...");
    logger.debug(`Version: ${getVersion()}`);
}

const defaultConfig: IConfiguration = {
    lives: 3,
    dificulty: "medium",
    topic: 9,
    questions: 10,
    mode: "boolean",
};

const cli = new Command()
    .name("not-quiz-game")
    .description("The best game ever")
    .version(getVersion())
    .option("-l, --lives <number>", "Number of lives", Number, defaultConfig.lives)
    .option("-d, --dificulty <dificulty>", "Game difficulty", defaultConfig.dificulty)
    .addOption(
        new Option("-d, --dificulty <dificulty>", "Game difficulty").choices(["any", "easy", "hard", "medium"] as const)
    )
    .option("-t, --topic <number>", "Topic number", Number, defaultConfig.topic)
    .option("-q, --questions <number>", "Number of questions", Number, defaultConfig.questions)
    .addOption(new Option("-m --mode <mode>", "Game mode").choices(["multiple", "boolean"] as const))
    .option("-d --debug", "Runs the game in debug mode")
    .parse(process.argv);

const opts = cli.opts();

async function main() {
    welcome();
    showMenuBanner();
    console.log(opts.mode);
    console.log(defaultConfig.mode);
    await executeMainMenuOption(gameOptions);

    const data = await getApiData("https://opentdb.com/api.php", {
        amount: 10,
        category: 18,
        difficulty: "easy",
        type: "multiple",
    });
}

try {
    if (isDebugging()) initialDebug();
    await main();
} catch (e) {
    logger.error(e);
}
