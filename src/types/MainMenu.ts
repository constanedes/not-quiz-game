export enum MainMenuOption {
    Play = "Play",
    Options = "Options",
    Credits = "Credits",
    Exit = "Exit Game",
}

export type MainMenuOptions = keyof typeof MainMenuOption;
