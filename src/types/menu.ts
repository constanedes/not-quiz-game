export enum MenuOption {
    Play = 0,
    Options = 1,
    Credits = 2,
    Exit = 3,
}

export type MenuOptions = keyof typeof MenuOption;
