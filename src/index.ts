#!/usr/bin/env node
import { gameOptions, questionsFilePath } from "./consts.js";
import { evalOption, showMenuBanner, welcome } from "./helpers/menu.js";
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
    gameOptions.forEach((x) => evalOption(x));
}

try {
    await main();
} catch (e) {
    loggerService.error(e);
}
