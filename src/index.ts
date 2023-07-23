#!/usr/bin/env node
import { gameOptions } from "./consts.js";
import { logger } from "./helpers/logger.js";
import { executeMainMenuOption, showMenuBanner, welcome } from "./helpers/menu.js";
import { getApiData } from "./utils.js";

function initialDebug() {
    logger.info("App running");
}

async function main() {
    initialDebug();
    welcome();
    showMenuBanner();
    await executeMainMenuOption(gameOptions);

    /* const data = await getApiData("https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple", {
        amount: 10,
        category: 18,
        difficulty: "easy",
        type: "multiple",
    });
    console.log(data)
    */
}

try {
    await main();
} catch (e) {
    logger.error(e);
}
