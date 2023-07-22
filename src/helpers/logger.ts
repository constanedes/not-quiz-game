import chalk from "chalk";

const prefix = () => `[${new Date().toISOString()}]`;

export const logger = {
    error(...args: unknown[]) {
        console.error(`${prefix}[ERROR] - ${chalk.red(...args)}`);
    },
    warn(...args: unknown[]) {
        console.warn(`${prefix}[WARN] - ${chalk.yellow(...args)}`);
    },
    info(...args: unknown[]) {
        console.info(`${prefix}[INFO] - ${chalk.cyan(...args)}`);
    },
    debug(...args: unknown[]) {
        console.debug(`${prefix}[DEBUG] - ${chalk.magenta(...args)}`);
    },
    trace(...args: unknown[]) {
        console.trace(`${prefix}[TRACE] - ${chalk.gray(...args)}`);
    },
    success(...args: unknown[]) {
        console.log(`${prefix}[SUCCESS] - ${chalk.red(...args)}`);
    },
};
