import { WalletService } from '../../services'
import { Helper, constants, ApiError } from '../../utils'

const { getWalletByUserId } = WalletService
const { errorResponse } = Helper

const {
  INTERNAL_SERVER_ERROR,
  INSUFICIENT_FUNDS,
  RESOURCE_EXISTS_VERIFICATION_FAIL
} = constants

/**
 * A collection of middleware methods used to validates
 * Wallet requests.
 * @class WalletMiddleware
 */
class WalletMiddleware {
  /**
   * Validates wallet request credentials.
   * @static
   * @param { Object } req - The request from the endpoint.
   * @param { Object } res - The response returned by the method.
   * @param { function } next - Calls the next handle.
   * @returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof FacilityMiddleware
   */
  static async fetchUserWalletById (req, res, next) {
    try {
      const { id } = req.user
      const [data] = await getWalletByUserId(id)
      const wallet = Helper.checkArrayIsNotEmpty(data)
      req.wallet = wallet
      next()
    } catch (e) {
      e.status = RESOURCE_EXISTS_VERIFICATION_FAIL('WALLET')
      Helper.moduleErrLogMessager(e)
      const apiError = new ApiError({
        status: 500,
        message: INTERNAL_SERVER_ERROR
      })
      errorResponse(req, res, apiError)
    }
  }

  /**
   * Validates wallet request credentials.
   * @static
   * @param { Object } req - The request from the endpoint.
   * @param { Object } res - The response returned by the method.
   * @param { function } next - Calls the next handle.
   * @returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof FacilityMiddleware
   */
  static async fetchReceiverWalletById (req, res, next) {
    try {
      const { id } = req.receiver
      const [data] = await getWalletByUserId(id)
      const wallet = Helper.checkArrayIsNotEmpty(data)
      req.receiverwallet = wallet
      return next()
    } catch (e) {
      e.status = RESOURCE_EXISTS_VERIFICATION_FAIL('WALLET')
      Helper.moduleErrLogMessager(e)
      const apiError = new ApiError({
        status: 500,
        message: INTERNAL_SERVER_ERROR
      })
      errorResponse(req, res, apiError)
    }
  }

  /**
   * Validates wallet request credentials.
   * @static
   * @param { Object } req - The request from the endpoint.
   * @param { Object } res - The response returned by the method.
   * @param { function } next - Calls the next handle.
   * @returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof FacilityMiddleware
   */
  static async checkTransferStatus (req, res, next) {
    try {
      const { wallet, body } = req
      const walletbal = Helper.parseData(wallet.balance)
      if (walletbal < body.amount) {
        return errorResponse(
          req,
          res,
          new ApiError({ status: 400, message: INSUFICIENT_FUNDS })
        )
      }
      next()
    } catch (e) {
      e.status = RESOURCE_EXISTS_VERIFICATION_FAIL('WALLET')
      Helper.moduleErrLogMessager(e)
      const apiError = new ApiError({
        status: 500,
        message: INTERNAL_SERVER_ERROR
      })
      errorResponse(req, res, apiError)
    }
  }
}

export default WalletMiddleware
