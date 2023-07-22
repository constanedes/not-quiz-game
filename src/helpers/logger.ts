import chalk from "chalk";

enum LogLevel {
    Trace = 0,
    Log = 1,
    Debug = 2,
    Info = 3,
    Warn = 4,
    Error = 5,
}

const prefix = (level: LogLevel) => `[${LogLevel[level].toUpperCase()}] -`;

export const logger = {
    error(...args: unknown[]) {
        console.error(chalk.red(prefix(LogLevel.Error)), ...args);
    },
    warn(...args: unknown[]) {
        console.warn(chalk.yellow(prefix(LogLevel.Warn)), ...args);
    },
    info(...args: unknown[]) {
        console.info(chalk.cyan(prefix(LogLevel.Info)), ...args);
    },
    debug(...args: unknown[]) {
        console.debug(chalk.magenta(prefix(LogLevel.Debug)), ...args);
    },
    trace(...args: unknown[]) {
        console.trace(chalk.gray(prefix(LogLevel.Trace)), ...args);
    },
};
