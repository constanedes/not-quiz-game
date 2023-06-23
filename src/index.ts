#!/usr/bin/env node
import { evalOption, showMenuBanner, welcome } from "./helpers/menu.js";
import { gameOptions, questionsFilePath } from "./consts.js";
import LoggerService from "./services/LoggerService.js";

const loggerService = new LoggerService();

function initialDebug() {
    loggerService.debug(questionsFilePath);
    loggerService.info("App running");
}

async function main() {
    initialDebug();
    welcome();
    showMenuBanner();
    //const r = await showMainMenuOptions();
    evalOption(gameOptions);
}

try {
    await main();
} catch (e) {
    loggerService.error(e);
}
