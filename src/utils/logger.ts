import fs from "fs";
import path from "path";
import chalk from "chalk";

enum LogLevel {
    Trace = 0,
    Log = 1,
    Debug = 2,
    Info = 3,
    Warning = 4,
    Error = 5,
}

export default class Logger {
    private static instance: Logger;
    private logFilePath: string;

    private constructor() {
        const rootPath = process.cwd();
        this.logFilePath = path.join(rootPath, "logs.txt");
    }

    static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    private getFormattedMessage(level: LogLevel, message: string) {
        const timestamp = new Date().toISOString();
        const levelKey = LogLevel[level].toUpperCase();
        const logType = {
            [LogLevel.Trace]: chalk.gray,
            [LogLevel.Log]: chalk.blue,
            [LogLevel.Info]: chalk.green,
            [LogLevel.Warning]: chalk.yellow,
            [LogLevel.Error]: chalk.red,
            [LogLevel.Debug]: chalk.magenta,
        };
        return {
            msgColored: `[${logType[level](timestamp)}][${logType[level](levelKey)}] - ${message}`,
            msgUncolored: `[${timestamp}][${levelKey}] - ${message}`,
        };
    }

    private writeLog(level: LogLevel, message: string, optionalParams?: any[]): void {
        const { msgColored, msgUncolored } = this.getFormattedMessage(level, message);
        switch (level) {
            case LogLevel.Trace:
                optionalParams ? console.trace(msgColored, optionalParams) : console.trace(msgColored);
                break;
            case LogLevel.Log:
                optionalParams ? console.log(msgColored, optionalParams) : console.log(msgColored);
                break;
            case LogLevel.Info:
                optionalParams ? console.info(msgColored, optionalParams) : console.info(msgColored);
                break;
            case LogLevel.Warning:
                optionalParams ? console.warn(msgColored, optionalParams) : console.warn(msgColored);
                break;
            case LogLevel.Error:
                optionalParams ? console.error(msgColored, optionalParams) : console.error(msgColored);
                break;
            case LogLevel.Debug:
                optionalParams ? console.debug(msgColored, optionalParams) : console.debug(msgColored);
                break;
        }
        fs.appendFileSync(this.logFilePath, msgUncolored + "\n", "utf-8");
    }

    trace(message: string, optionalParams?: Array<any>): void {
        this.writeLog(LogLevel.Trace, message, optionalParams);
    }

    log(message: string, optionalParams?: Array<any>): void {
        this.writeLog(LogLevel.Log, message, optionalParams);
    }

    debug(message: string, optionalParams?: Array<any>): void {
        this.writeLog(LogLevel.Debug, message, optionalParams);
    }

    info(message: string, optionalParams?: Array<any>): void {
        this.writeLog(LogLevel.Info, message, optionalParams);
    }

    warning(message: string, optionalParams?: Array<any>): void {
        this.writeLog(LogLevel.Warning, message, optionalParams);
    }

    error(message: string, optionalParams?: Array<any>): void {
        this.writeLog(LogLevel.Error, message, optionalParams);
    }
}
