import { UserService } from '../../services'
import { Helper, constants, ApiError } from '../../utils'

const { getUserByEmail } = UserService
const { errorResponse } = Helper

const {
  EMAIL_CONFLICT,
  INTERNAL_SERVER_ERROR,
  RESOURCE_EXISTS_VERIFICATION_FAIL,
  USER_NOT_FOUND
} = constants

/**
 * A collection of middleware methods for user
 * @class UserMiddleware
 */
class UserMiddleware {
  /**
   * Validates User request credentials.
   * @static
   * @param { Object } req - The request from the endpoint.
   * @param { Object } res - The response returned by the method.
   * @param { function } next - Calls the next handle.
   * @returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof UserMiddleware
   */
  static async validateSignUpEmail (req, res, next) {
    try {
      const [data] = await getUserByEmail(req.body.email)
      const user = Helper.checkArrayIsNotEmpty(data)
      return user
        ? errorResponse(
          req,
          res,
          new ApiError({
            status: 409,
            message: EMAIL_CONFLICT
          })
        )
        : next()
    } catch (error) {
      error.status = RESOURCE_EXISTS_VERIFICATION_FAIL('USER_EMAIL')
      Helper.moduleErrLogMessager(error)
      const apiError = new ApiError({
        status: 500,
        message: INTERNAL_SERVER_ERROR
      })
      errorResponse(req, res, apiError)
    }
  }

  /**
   * Validates User request credentials.
   * @static
   * @param { Object } req - The request from the endpoint.
   * @param { Object } res - The response returned by the method.
   * @param { function } next - Calls the next handle.
   * @returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof UserMiddleware
   */
  static async fetchReceiver (req, res, next) {
    try {
      const [data] = await getUserByEmail(req.body.email)
      const user = Helper.checkArrayIsNotEmpty(data)
      req.receiver = user
      return req.receiver
        ? next()
        : errorResponse(
          req,
          res,
          new ApiError({
            status: 404,
            message: USER_NOT_FOUND
          })
        )
    } catch (error) {
      error.status = RESOURCE_EXISTS_VERIFICATION_FAIL('USER_EMAIL')
      Helper.moduleErrLogMessager(error)
      const apiError = new ApiError({
        status: 500,
        message: INTERNAL_SERVER_ERROR
      })
      errorResponse(req, res, apiError)
    }
  }
}

export default UserMiddleware
