export interface IMenuItem {
    readonly name: string;
    readonly action?: () => Promise<void>;
}
