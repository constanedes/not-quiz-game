#!/usr/bin/env node
import { showCredits, showMainMenuOptions, showMenuBanner, welcome } from "./helpers/menu.js";
import { container, questionsFilePath } from "./consts.js";
import LoggerService from "./services/LoggerService.js";

const loggerService = container.resolve(LoggerService);

function initialDebug() {
    loggerService.debug(questionsFilePath);
    loggerService.info("App running");
}

async function main() {
    initialDebug();
    welcome();
    showMenuBanner();
    const r = await showMainMenuOptions();
    console.log(r);
}

(async () => {
    try {
        await main();
        showCredits();
    } catch (e) {
        loggerService.error(e);
    }
})();
