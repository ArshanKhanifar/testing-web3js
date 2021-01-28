import {current_timestamp} from "./date.js";

const LOG_LEVELS = {
  DEBUG: 1,
  INFO: 2,
  WARNING: 3,
  ERROR: 4,
};


export default class Logger {
  constructor(name, log_level=LOG_LEVELS.DEBUG) {
    this.log_level = log_level;
    this.name = name;
  }

  method_lookup = {
    [LOG_LEVELS.DEBUG]: console.debug,
    [LOG_LEVELS.INFO]: console.info,
    [LOG_LEVELS.WARNING]: console.warn,
    [LOG_LEVELS.ERROR]: console.error,
  };

  description_lookup = {
    [LOG_LEVELS.DEBUG]: "DEBUG",
    [LOG_LEVELS.INFO]: "INFO",
    [LOG_LEVELS.WARNING]: "WARNING",
    [LOG_LEVELS.ERROR]: "ERROR"
  };

  log(level, ...msg) {
    if (level < this.log_level ) {
      return
    }
    const logger_method = this.method_lookup[level];
    const level_string = this.description_lookup[level];
    const format = `${level_string} - ${this.name} - ${current_timestamp()} - `;
    logger_method(format, ...msg)
  }

  debug(...msg) {
    return this.log(LOG_LEVELS.DEBUG, ...msg);
  }

  info(...msg) {
    return this.log(LOG_LEVELS.INFO, ...msg);
  }

  warn(...msg) {
    return this.log(LOG_LEVELS.WARNING, ...msg);
  }

  error(...msg) {
    return this.log(LOG_LEVELS.ERROR, ...msg);
  }
}
