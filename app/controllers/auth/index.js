import { Helper, constants } from '../../utils'

const { LOGIN_USER_SUCCESSFULLY } = constants

/**
 * A collection of methods that controls the success response for CRUD operations on auth.
 * @class AuthController
 */
class AuthController {
  /**
   * Logs in a user
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @returns {JSON } A JSON response with the user's details and a JWT.'
   * @memberof AuthController
   */
  static signIn (req, res) {
    const { user } = req
    const data = Helper.addTokenToData(user)
    Helper.successResponse(res, {
      data,
      message: LOGIN_USER_SUCCESSFULLY
    })
  }
}

export default AuthController
