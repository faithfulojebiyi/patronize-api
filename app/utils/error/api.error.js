import constants from '../constants'
import ModuleError from './module.error'

const { INTERNAL_SERVER_ERROR } = constants
/**
 * A custom error class for handling Api errors.
 * @class ApiError
 */
export default class ApiError extends ModuleError {
  /**
   * The ApiError Constructor.
   * @param {Object} options - A configuration object for errors.
   * @param {String} options.message - The error message if any.
   * @param {Number} options.status - The status code of error if any.
   * @param {Array} options.errors - Additional error details if any.
   * @constructor ApiError
   */
  constructor (options = {}) {
    super(options)
    this.name = this.constructor.name
    this.message = options.message || INTERNAL_SERVER_ERROR
    this.status = options.status || 500
  }
}
