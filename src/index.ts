#!/usr/bin/env node
import { gameOptions, questionsFilePath } from "./consts.js";
import { logger } from "./helpers/logger.js";
import { evalOption, showMenuBanner, welcome } from "./helpers/menu.js";

function initialDebug() {
    logger.debug(questionsFilePath);
    logger.info("App running");
}

async function main() {
    initialDebug();
    welcome();
    showMenuBanner();

    //const r = await showMainMenuOptions();
    //gameOptions.forEach((x) => evalOption(x));
}

try {
    await main();
} catch (e) {
    logger.error(e);
}
