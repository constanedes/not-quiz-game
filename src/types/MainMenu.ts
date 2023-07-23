export enum MainMenuOption {
    Play = "Play",
    Credits = "Credits",
    Exit = "Exit Game",
}

export type MainMenuOptions = keyof typeof MainMenuOption;
