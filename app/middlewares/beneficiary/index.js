import { FlutterWaveService, BeneficiaryService } from '../../services'
import { Helper, ApiError, constants } from '../../utils'

const {
  INVALID_ACCOUNT_NO,
  NO_BENEFICIARY_FOUND,
  RESOURCE_EXISTS_VERIFICATION_FAIL,
  INTERNAL_SERVER_ERROR
} = constants

const { resolveAccountNo } = FlutterWaveService
const { getBeneficiarybyUserId, getBeneficiarybyAccountNo } = BeneficiaryService
const { errorResponse } = Helper

/**
 * A collection of middleware methods for beneficiarys
 * @class BeneficiaryMiddleware
 */
class BeneficiaryMiddleware {
  /**
   * Middlesware used for validating card beneficiary
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next
   * @returns { JSON } A JSON response containing the details of the contact us added
   * @memberof BeneficiaryMiddleware
   */
  static async verifyAccountNo (req, res, next) {
    try {
      const { id } = req.user
      const data = {
        account_number: req.body.account_no,
        account_bank: req.body.bank_code
      }
      const resp = await resolveAccountNo(data)
      req.body.user_id = id
      req.account = resp.data.data
      next()
    } catch (e) {
      e.status = INVALID_ACCOUNT_NO
      Helper.moduleErrLogMessager(e)
      errorResponse(
        req,
        res,
        new ApiError({ message: INVALID_ACCOUNT_NO, status: 400 })
      )
    }
  }

  /**
   * Validates check if  Beneficiary exist for user.
   * @static
   * @param { Object } req - The request from the endpoint.
   * @param { Object } res - The response returned by the method.
   * @param { function } next - Calls the next handle.
   * @returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof BeneficiaryMiddleware
   */
  static async getBeneficiary (req, res, next) {
    const { id } = req.user
    try {
      const [data] = await getBeneficiarybyUserId(id)
      const beneficiary = Helper.checkArrayIsNotEmpty(data)
      req.beneficiary = beneficiary
      return req.beneficiary
        ? next()
        : errorResponse(
          req,
          res,
          new ApiError({
            status: 404,
            message: NO_BENEFICIARY_FOUND
          })
        )
    } catch (e) {
      e.status = RESOURCE_EXISTS_VERIFICATION_FAIL('BENEFICIARY')
      Helper.moduleErrLogMessager(e)
      const apiError = new ApiError({
        status: 500,
        message: INTERNAL_SERVER_ERROR
      })
      errorResponse(req, res, apiError)
    }
  }

  /**
   * Validates check a Beneficiary exist for user.
   * @static
   * @param { Object } req - The request from the endpoint.
   * @param { Object } res - The response returned by the method.
   * @param { function } next - Calls the next handle.
   * @returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof BeneficiaryMiddleware
   */
  static async validatedBeneficiary (req, res, next) {
    const { account_no } = req.body
    try {
      const [data] = await getBeneficiarybyAccountNo(account_no)
      const account = Helper.checkArrayIsNotEmpty(data)
      req.account = account
      return req.account
        ? next()
        : errorResponse(
          req,
          res,
          new ApiError({
            status: 404,
            message: INVALID_ACCOUNT_NO
          })
        )
    } catch (e) {
      e.status = RESOURCE_EXISTS_VERIFICATION_FAIL('BENEFICIARY')
      Helper.moduleErrLogMessager(e)
      const apiError = new ApiError({
        status: 500,
        message: INTERNAL_SERVER_ERROR
      })
      errorResponse(req, res, apiError)
    }
  }
}

export default BeneficiaryMiddleware
