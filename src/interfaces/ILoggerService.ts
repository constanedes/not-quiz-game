export default interface ILoggerService {
    trace(message: string, optionalParams?: unknown[]): void;
    log(message: string, optionalParams?: unknown[]): void;
    debug(message: string, optionalParams?: unknown[]): void;
    info(message: string, optionalParams?: unknown[]): void;
    warning(message: string, optionalParams?: unknown[]): void;
    error(message: string, optionalParams?: unknown[]): void;
}
