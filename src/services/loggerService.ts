import fs from "fs";
import path from "path";
import chalk from "chalk";
import ILoggerService from "../interfaces/ILoggerService";

enum LogLevel {
    Trace = 0,
    Log = 1,
    Debug = 2,
    Info = 3,
    Warning = 4,
    Error = 5,
}

export default class LoggerService implements ILoggerService {
    private static instance: LoggerService;
    private logFilePath: string;

    private constructor() {
        const rootPath = process.cwd();
        this.logFilePath = path.join(rootPath, "logs.txt");
    }

    static getInstance(): LoggerService {
        if (!LoggerService.instance) {
            LoggerService.instance = new LoggerService();
        }
        return LoggerService.instance;
    }

    private getFormattedMessage(level: LogLevel, message: string) {
        const timestamp = new Date().toISOString();
        const levelKey = LogLevel[level].toUpperCase();
        const logColor = {
            [LogLevel.Trace]: chalk.gray,
            [LogLevel.Log]: chalk.blue,
            [LogLevel.Info]: chalk.green,
            [LogLevel.Warning]: chalk.yellow,
            [LogLevel.Error]: chalk.red,
            [LogLevel.Debug]: chalk.magenta,
        };
        return {
            msgColored: `[${logColor[level](timestamp)}][${logColor[level](levelKey)}] - ${message}`,
            msgUncolored: `[${timestamp}][${levelKey}] - ${message}`,
        };
    }

    private writeLog(level: LogLevel, message: string, optionalParams?: unknown[]): void {
        const { msgUncolored } = this.getFormattedMessage(level, message);

        fs.appendFileSync(this.logFilePath, msgUncolored + "\n", "utf-8");
    }

    trace(message: string): void {
        this.writeLog(LogLevel.Trace, message);
    }

    log(message: string): void {
        this.writeLog(LogLevel.Log, message);
    }

    debug(message: string): void {
        this.writeLog(LogLevel.Debug, message);
    }

    info(message: string): void {
        this.writeLog(LogLevel.Info, message);
    }

    warning(message: string): void {
        this.writeLog(LogLevel.Warning, message);
    }

    error(message: string): void {
        this.writeLog(LogLevel.Error, message);
    }
}
