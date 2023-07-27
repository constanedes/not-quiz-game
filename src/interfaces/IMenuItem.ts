export interface IMenuItem {
    name: string;
    action?: () => Promise<void>;
}
