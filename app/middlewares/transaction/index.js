import { FlutterWaveService } from '../../services'
import { Helper, ApiError, constants } from '../../utils'
// import config from '../../../config'

const {
  CHARGE_INITIATION_SUCCESS,
  CHARGE_INITIATION_FAILED,
  CARD_CHARGE_FAILED,
  VALIDATE_CARD_CHARGE_FAILED,
  WITHDRAWAL_INITIATION_SUCCESS,
  WITHDRAWAL_INITIATION_FAILED
} = constants

const {
  chargeCard, bankTransfer, validateCardCharge,
  verifyCardPayment, transferToBank
} = FlutterWaveService
const { errorResponse, successResponse } = Helper

/**
 * A collection of middleware methods for transactions
 * @class TransactionMiddleware
 */
class TransactionMiddleware {
  /**
   * Middleswares used for intitalizing card transaction
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next
   * @returns { JSON } A JSON response containing the details of the contact us added
   * @memberof TransactionMiddleware
   */
  static async addTransactionref (req, res, next) {
    try {
      const ref = Helper.generateTransactionRef()
      req.body.tx_ref = ref
      next()
    } catch (e) {
      e.status = CARD_CHARGE_FAILED
      Helper.moduleErrLogMessager(e)
      errorResponse(req, res, new ApiError({ message: CARD_CHARGE_FAILED }))
    }
  }

  /**
   * Middleswares used for intitalizing card transaction
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next
   * @returns { JSON } A JSON response containing the details of the contact us added
   * @memberof TransactionMiddleware
   */
  static async initCardCharge (req, res, next) {
    try {
      const resp = await chargeCard(req.body)
      const data = resp.data.data
      return successResponse(res, {
        message: CHARGE_INITIATION_SUCCESS,
        data: data
      })
    } catch (e) {
      e.status = CHARGE_INITIATION_FAILED
      Helper.moduleErrLogMessager(e)
      errorResponse(
        req,
        res,
        new ApiError({ message: CHARGE_INITIATION_FAILED })
      )
    }
  }

  /**
   * Middleswares used for intitalizing bank transaction
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next
   * @returns { JSON } A JSON response containing the details of the contact us added
   * @memberof TransactionMiddleware
   */
  static async initBankTransfer (req, res, next) {
    try {
      const resp = await bankTransfer(req.body)
      const data = resp.data.meta.authorization
      req.banktransaction = data
      next()
    } catch (e) {
      e.status = CHARGE_INITIATION_FAILED
      Helper.moduleErrLogMessager(e)
      errorResponse(
        req,
        res,
        new ApiError({ message: e.response.data.message })
      )
    }
  }

  /**
   * Middleswares used for intitalizing bank withdrawal
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next
   * @returns { JSON } A JSON response containing the details of the contact us added
   * @memberof TransactionMiddleware
   */
  static async withdrawToBank (req, res, next) {
    try {
      const { user, body, account } = req
      const withdrawdata = {
        account_bank: account.bank_code,
        account_number: account.account_no,
        amount: body.amount,
        currenvy: 'NGN',
        reference: Helper.generateSuccessMockRef(),
        callback_url: 'http://9c47-105-112-46-51.ngrok.io/api/v1/webhook/success',
        meta: {
          email: user.email
        }
      }
      console.log(withdrawdata)
      const resp = await transferToBank(withdrawdata)
      const data = resp.data.data
      // console.log(data)
      // req.withdrawal = data
      return successResponse(res, {
        message: WITHDRAWAL_INITIATION_SUCCESS,
        data: data
      })
    } catch (e) {
      e.status = WITHDRAWAL_INITIATION_FAILED
      Helper.moduleErrLogMessager(e)
      errorResponse(
        req,
        res,
        new ApiError({ message: WITHDRAWAL_INITIATION_FAILED })
      )
    }
  }

  /**
   * Middlesware used for validating card transaction
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next
   * @returns { JSON } A JSON response containing the details of the contact us added
   * @memberof TransactionMiddleware
   */
  static async validateCharge (req, res, next) {
    try {
      const resp = await validateCardCharge(req.body)
      req.trans = resp.data.data
      next()
    } catch (e) {
      e.status = VALIDATE_CARD_CHARGE_FAILED
      Helper.moduleErrLogMessager(e)
      errorResponse(
        req,
        res,
        new ApiError({ message: VALIDATE_CARD_CHARGE_FAILED })
      )
    }
  }

  /**
   * Middlesware used for validating card transaction
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next
   * @returns { JSON } A JSON response containing the details of the contact us added
   * @memberof TransactionMiddleware
   */
  static async verifyCharge (req, res, next) {
    try {
      const { id } = req.trans
      const resp = await verifyCardPayment(id)
      req.flwtransaction = resp.data.data
      next()
    } catch (e) {
      e.status = VALIDATE_CARD_CHARGE_FAILED
      Helper.moduleErrLogMessager(e)
      errorResponse(
        req,
        res,
        new ApiError({ message: VALIDATE_CARD_CHARGE_FAILED })
      )
    }
  }

  /**
   * Middlesware used for Verifying bank transfers
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next
   * @returns { JSON } A JSON response containing the details of the contact us added
   * @memberof TransactionMiddleware
   */
  static async verifyBankTransfer (req, res, next) {
    try {
      // const hash = req.headers['verif-hash']
      // if (!hash) {
      //   return errorResponse(
      //     req,
      //     res,
      //     new ApiError({
      //       status: 400,
      //       message: INVALID_PERMISSION
      //     })
      //   )
      // }
      // const secret_hash = config.MY_HASH
      // if (hash !== secret_hash) {
      //   return errorResponse(
      //     req,
      //     res,
      //     new ApiError({
      //       status: 400,
      //       message: INVALID_PERMISSION
      //     })
      //   )
      // }
      // const request_json = req.body
      console.log(req.body)
      res.sendStatus(200)
      // return successResponse(res, {
      //   message: 'withdrawal success',
      //   data: request_json
      // })
      // req.flwtransaction = resp.data.data
      // next()
    } catch (e) {
      e.status = 'withdraw failed'
      Helper.moduleErrLogMessager(e)
      errorResponse(
        req,
        res,
        new ApiError({ message: 'withdraw failed' })
      )
    }
  }

  // /**
  //  * Middlesware used for Verifying bank transfers
  //  * @static
  //  * @param {Request} req - The request from the endpoint.
  //  * @param {Response} res - The response returned by the method.
  //  * @param {Next} next
  //  * @returns { JSON } A JSON response containing the details of the contact us added
  //  * @memberof TransactionMiddleware
  //  */
  // static async verifyBankTransfer (req, res, next) {
  //   try {
  //     const { id } = req.withdrawal
  //     console.log(id)
  //     const resp = await verifyTransfer(id)
  //     return successResponse(res, {
  //       message: 'withdrawal success',
  //       data: resp
  //     })
  //     // req.flwtransaction = resp.data.data
  //     // next()
  //   } catch (e) {
  //     e.status = 'withdraw failed'
  //     Helper.moduleErrLogMessager(e)
  //     errorResponse(
  //       req,
  //       res,
  //       new ApiError({ message: 'withdraw failed' })
  //     )
  //   }
  // }
}

export default TransactionMiddleware
