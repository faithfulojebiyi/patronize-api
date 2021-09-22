import { UserModel } from '../../models'
import { Helper, constants, ApiError, DBError } from '../../utils'

const { successResponse } = Helper
const {
  CREATE_USER_ERROR,
  CREATE_USER_SUCCESS
} = constants

/**
 * A collection of methods that controls the success response
 * for CRUD operations on the User.
 *
 * @class UserController
 */
class UserController {
  /**
   * Controllers used for adding users
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next
   * @returns { JSON } A JSON response containing the details of the contact us added
   * @memberof UserController
   */
  static async createUser (req, res, next) {
    try {
      const user = new UserModel({
        ...req.body
      })
      const data = await user.save()
      return successResponse(res, {
        message: CREATE_USER_SUCCESS,
        data: data
      })
    } catch (e) {
      const dbError = new DBError({
        status: CREATE_USER_ERROR,
        message: e.message
      })
      Helper.moduleErrLogMessager(dbError)
      next(new ApiError({ message: CREATE_USER_ERROR }))
    }
  }
}

export default UserController
