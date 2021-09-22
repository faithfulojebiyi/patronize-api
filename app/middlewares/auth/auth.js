import { UserService } from '../../services'
import { Helper, constants, ApiError, genericErrors } from '../../utils'

const { getUserByEmail } = UserService
const { errorResponse } = Helper

const {
  ERROR_FETCHING_USER,
  USER_EMAIL_EXIST_VERIFICATION_FAIL_MSG,
  USER_EMAIL_EXIST_VERIFICATION_FAIL
} = constants

/**
 * A collection of middleware used to verify a user before accessing protected resources
 */
class AuthMiddleware {
  /**
   * Checks if a specific already exist for a user account.
   * @static
   * @param { Object } req - The request from the endpoint.
   * @param { Object } res - The response returned by the method.
   * @param { function } next - Calls the next handle.
   * @returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof AuthMiddleware
   *
   */
  static async emailValidator (req, res, next) {
    try {
      const [data] = await getUserByEmail(req.body.email)
      const user = Helper.checkArrayIsNotEmpty(data)
      if (user) {
        return next()
      }
      errorResponse(
        req,
        res,
        new ApiError({
          status: 400,
          message: ERROR_FETCHING_USER
        })
      )
    } catch (e) {
      e.status = USER_EMAIL_EXIST_VERIFICATION_FAIL
      Helper.moduleErrLogMessager(e)
      errorResponse(
        req,
        res,
        new ApiError({ message: USER_EMAIL_EXIST_VERIFICATION_FAIL_MSG })
      )
    }
  }

  /**
   * Validates user's login credentials, with emphasis on the
   * existence of a user with the provided email address.
   * @static
   * @param { Object } req - The request from the endpoint.
   * @param { Object } res - The response returned by the method.
   * @param { function } next - Calls the next handle.
   * @returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof AuthMiddleware
   *
   */
  static async loginEmailValidator (req, res, next) {
    try {
      const [data] = await getUserByEmail(req.body.email)
      const user = Helper.checkArrayIsNotEmpty(data)
      req.user = user
      return req.user
        ? next()
        : errorResponse(req, res, genericErrors.inValidLogin)
    } catch (e) {
      e.status = USER_EMAIL_EXIST_VERIFICATION_FAIL
      Helper.moduleErrLogMessager(e)
      errorResponse(
        req,
        res,
        new ApiError({ message: USER_EMAIL_EXIST_VERIFICATION_FAIL_MSG })
      )
    }
  }
}

export default AuthMiddleware
