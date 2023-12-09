#!/usr/bin/env node
import { defaultConfig, gameOptions } from "./consts.js";
import { logger } from "./helpers/logger.js";
import { executeMainMenuOption, showMenuBanner } from "./helpers/menu.js";
import { IConfiguration } from "./interfaces/IConfiguration.js";
import { getVersion } from "./utils.js";
import { Command, Option } from "commander";

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
    showMenuBanner();
    await executeMainMenuOption(gameOptions);
}

try {
    if (process.env.NODE_ENV !== "production" || cli.debug) initialDebug();
    await main();
} catch (e) {
    logger.error(e);
}
