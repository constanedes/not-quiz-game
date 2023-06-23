import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { MainMenuOption } from "./types/MainMenu.js";
import { MenuItem } from "./interfaces/IMenuItem.js";
import { exitGame, showCredits } from "./helpers/menu.js";

// global consts
export const __dirname: string = dirname(fileURLToPath(import.meta.url));
export const questionsFilePath: string = join(__dirname, "questions.json");
export const lives: number = 3;

export const gameOptions: MenuItem[] = [
    {
        name: MainMenuOption.Play,
        action: async () => showCredits(),
    },
    {
        name: MainMenuOption.Options,
        submenu: [
            {
                name: "Change Difficulty",
                action: async () => {
                    console.log("Cambiando la dificultad del juego");
                    // Lógica para cambiar la dificultad del juego
                },
            },
            {
                name: "Change Volume",
                action: async () => {
                    console.log("Cambiando el volumen del juego");
                    // Lógica para cambiar el volumen del juego
                },
                back: true,
            },
        ],
    },
    {
        name: MainMenuOption.Credits,
        action: async () => {
            console.log("Mostrando los créditos del juego");
            // Lógica para mostrar los créditos del juego
        },
    },
    {
        name: MainMenuOption.Exit,
        action: async () => exitGame(),
    },
];
