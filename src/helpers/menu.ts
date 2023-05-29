import gradient from "gradient-string";
import { setTimeout } from "timers/promises";
import figlet from "figlet";

async function sleep(ms: number) {
    await setTimeout(ms);
}

export function showMenuBanner() {
    const menuBanner = figlet.textSync("QUIZ-GAME", {
        font: "Larry 3D 2",
        horizontalLayout: "default",
        verticalLayout: "full",
        width: 100,
        whitespaceBreak: false,
    });

    console.log(gradient.pastel(menuBanner));
}
