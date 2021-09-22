import { Helper, ApiError } from '../../utils'

const { errorResponse, validateInput } = Helper

/**
 * @class ValidationMiddleware
 */
class ValidationMiddleware {
  /**
   * @static
   * @param {Object} schema - The validation schema.
   * @returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof ValidationMiddleware
   */
  static validate (schema) {
    return async (req, res, next) => {
      try {
        await validateInput(schema, req.body)
        next()
      } catch (error) {
        const apiError = new ApiError({
          status: 400,
          message: error.details[0].message
        })
        errorResponse(req, res, apiError)
      }
    }
  }
}

export default ValidationMiddleware
