import constants from '../constants'
import ModuleError from './module.error'

const { DB_ERROR, DB_ERROR_STATUS } = constants

/**
 * A custom error class for handling db related errors.
 * @class DBError
 */
export default class DBError extends ModuleError {
  /**
   * The DBError Constructor.
   * @param {Object} options - A configuration object for errors.
   * @param {String} options.message - The error message if any.
   * @param {String} options.status - The status of operation if any.
   * @param {Array} options.errors - Additional error details if any.
   * @constructor DBError
   */
  constructor (options = {}) {
    super(options)
    this.name = this.constructor.name
    this.message = options.message || DB_ERROR
    this.status = options.status || DB_ERROR_STATUS
  }
}
