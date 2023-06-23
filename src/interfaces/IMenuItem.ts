export interface MenuItem {
    name: string;
    action?: () => Promise<void>;
    submenu?: MenuItem[];
    back?: boolean;
}
