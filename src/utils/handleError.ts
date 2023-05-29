import LoggerService from "../services/loggerService";

export default function handleError(logger: LoggerService, error: unknown): void {
    if (error instanceof Error) {
        logger.error(error.message);
    } else {
        logger.error(`Unknown error: ${error}`);
    }
}
