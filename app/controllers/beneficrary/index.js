import { BeneficiaryModel } from '../../models'
import { Helper, constants, ApiError, DBError } from '../../utils'

const { successResponse } = Helper

const { CREATE_BENEFICIARY_ERROR, CREATE_BENEFICIARY_SUCCESS } = constants

/**
 * A collection of controller methods for beneficiary
 * @class BeneficiaryController
 */
class BeneficiaryController {
  /**
   * Controllers used for creating beneficiary
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next
   * @returns { JSON } A JSON response containing the details of the contact us added
   * @memberof BeneficiaryController
   */
  static async createBeneficiary (req, res, next) {
    try {
      const beneficiary = new BeneficiaryModel({
        ...req.body
      })
      const data = await beneficiary.save()
      return successResponse(res, {
        message: CREATE_BENEFICIARY_SUCCESS,
        data: data
      })
    } catch (e) {
      const dbError = new DBError({
        status: CREATE_BENEFICIARY_ERROR,
        meessage: e.message
      })
      Helper.moduleErrLogMessager(dbError)
      next(new ApiError({ message: CREATE_BENEFICIARY_ERROR }))
    }
  }
}

export default BeneficiaryController
