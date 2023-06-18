#!/usr/bin/env node
import { showCredits, showMainMenuOptions, showMenuBanner, welcome } from "./helpers/menu";
import { container, questionsFilePath } from "./consts";
import LoggerService from "./services/LoggerService";

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
