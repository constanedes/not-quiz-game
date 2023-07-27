#!/usr/bin/env node
import { Command, Option } from "@commander-js/extra-typings";
import { defaultConfig, gameOptions } from "./consts.js";
import { logger } from "./helpers/logger.js";
import { executeMainMenuOption, showMenuBanner, welcome } from "./helpers/menu.js";
import { getVersion, isDebugging } from "./utils.js";
import { IConfiguration } from "./interfaces/IConfiguration.js";

function initialDebug() {
    logger.info("App running...");
    logger.debug(`Version: ${getVersion()}`);
    logger.debug(program.opts());
}

const program = new Command()
    .name("not-quiz-game")
    .description("The best game ever")
    .version(getVersion())
    .option("-l, --lives <number>", "Number of lives", Number, defaultConfig.lives)
    .addOption(
        new Option("-d, --difficulty <difficulty>", "Game difficulty")
            .choices(["any", "easy", "hard", "medium"] as const)
            .default(defaultConfig.difficulty)
    )
    .option("-t, --topic <number>", "Topic number", Number, defaultConfig.topic)
    .option("-q, --questions <number>", "Number of questions", Number, defaultConfig.questions)
    .addOption(
        new Option("-m --mode <mode>", "Game mode")
            .choices(["multiple", "boolean"] as const)
            .default(defaultConfig.mode)
    )
    .option("--debug", "Runs the game in debug mode")
    .parse(process.argv);

const cli: IConfiguration = program.opts();
export const config: IConfiguration = { ...defaultConfig, ...cli };

async function main() {
    welcome();
    showMenuBanner();
    await executeMainMenuOption(gameOptions);
}

try {
    if (isDebugging() || cli.debug) initialDebug();
    await main();
} catch (e) {
    logger.error(e);
}
