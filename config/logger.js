import winston from 'winston'
import fs from 'fs'
import config from './env'

const { combine, label, timestamp, colorize, printf } = winston.format

const getLogToProcess = (fileOpt, consoleOpt) => {
  const array = []
  array.push(
    new winston.transports.File(fileOpt),
    new winston.transports.Console(consoleOpt)
  )
  return array
}

/**
 * Used to logs events in the app's lifecycle.
 * @class Logger
 */
class Logger {
  /**
   * Creates a new instance of the Logger.
   * @param { Object } options - contains configuration parameters.
   * @param { String } options.logDirPath - Path to the log folder,
   * the default directory is logs (optional).
   * @param { Boolean } options.debugMode - If true turns on the debugging mode, default is true.
   * @param { String } options.label - A name used to describe the context of the log generated.
   * @returns { Logger } - An instance of logger.
   * @constructor Logger
   */
  constructor (options) {
    this.logDir = options.logDirPath || `${config.rootPath}/logs`
    this.label = options.label || 'log'
    this._commonOptions = {
      console: {
        level: 'debug',
        handleExceptions: true,
        format: combine(
          colorize({ all: true }),
          printf(
            (msg) => `[${new Date(msg.timestamp).toUTCString()}]: ${msg.label} : - ${
              msg.level
            }: ${msg.message}`
          )
        )
      },
      file: {
        level: 'debug',
        filename: `${this.logDir}/app.log`,
        handleExceptions: true,
        maxsize: 5242880,
        maxFiles: 2000,
        format: winston.format.json()
      }
    }
    this.debugMode = options.debugMode === true || options.debugMode === undefined
    this.environment = config.NODE_ENV || 'development'
  }

  /**
   * @private
   * Creates the transport for the logger based on its configuration options.
   * @memberof Logger
   * @returns { Array<Object> } returns an array of winston transport objects.
   */
  _getTransports () {
    const { console, file } = this._commonOptions
    let level = this.debugMode ? 'debug' : 'info'
    if (this.environment === 'production' && this.debugMode) level = 'error'
    const consoleOpt = { ...console, level }
    const fileOpt = {
      ...file,
      filename: `${this.logDir}/app.${this.environment}.log`
    }
    const logToProcess = getLogToProcess(fileOpt, consoleOpt)
    return logToProcess
  }

  /**
   * Initiates a new logger.
   * @memberof Logger
   * @returns { Object } A new logger instance.
   */
  init () {
    if (!fs.existsSync(this.logDir)) fs.mkdirSync(this.logDir)
    const logger = winston.createLogger({
      format: combine(
        timestamp(),
        label({
          label: this.label
        })
      ),
      transports: this._getTransports(),
      exitOnError: false
    })
    logger.stream = {
      write (message) {
        logger.info(message)
      }
    }
    return logger
  }

  /**
   * Creates a new instance of the winston Logger with the specified configuration.
   * @static
   * @param { Object }  options - contains configuration parameters.
   * @param { String } options.logDirPath - Path to the log folder,
   * the default directory is logs (optional).
   * @param { Boolean } options.debugMode - If true turns on the debugging mode, default is true.
   * @param { String } options.label - A name used to describe the context of the log generated.
   * @returns { Object } - An instance of logger.
   * @memberof Logger
   */
  static createLogger (options) {
    const loggerInstance = new Logger(options)
    return loggerInstance.init()
  }
}
export default Logger
