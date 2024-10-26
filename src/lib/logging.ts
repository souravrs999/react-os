const DEVELOPMENT_ENVIRONMENT = process.env.NODE_ENV === 'development';

export type LoggingFunction = (...args: unknown[]) => void;
const log: LoggingFunction = (...args) => {
    if (DEVELOPMENT_ENVIRONMENT) {
        console.log(...args);
    }
}

const warn: LoggingFunction = (...args) => {
    if (DEVELOPMENT_ENVIRONMENT) {
        console.warn(...args);
    }
}

const error: LoggingFunction = (...args) => {
    if (DEVELOPMENT_ENVIRONMENT) {
        console.error(...args);
    }
}

const Logger = Object.assign({}, { log, warn, error });
export default Logger;