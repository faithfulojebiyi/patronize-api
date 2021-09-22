import { TransactionModel } from '../../models'
import { Helper, constants, ApiError, DBError } from '../../utils'

const { successResponse } = Helper

const {
  TRANSFER_SUCCESS, TRANSFER_ERROR_MESSAGE,
  CARD_TRANSACTION_ERROR, CARD_TRANSACTION_SUCCESS,
  BANK_TRANSACTION_SUCCESS, BANK_TRANSACTION_ERROR
} = constants

/**
 * A collection of controller methods for transactions
 * @class TransactionController
 */
class TransactionController {
  /**
   * Controllers used for intitalizing card transaction
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next
   * @returns { JSON } A JSON response containing the details of the contact us added
   * @memberof TransactionController
   */
  static async createCardTransaction (req, res, next) {
    try {
      const { flwtransaction, user, wallet } = req
      const walletbalance = JSON.parse(wallet.balance)
      const trans = {
        user_id: user.id,
        wallet_id: wallet.id,
        operation: 'credit',
        narration: 'Flutterwave card deposit',
        amount: flwtransaction.amount,
        balance: walletbalance + flwtransaction.amount
      }
      const transaction = new TransactionModel({
        ...trans
      })
      const data = await transaction.save()
      return successResponse(res, {
        message: CARD_TRANSACTION_SUCCESS,
        data: data
      })
    } catch (e) {
      const dbError = new DBError({
        status: CARD_TRANSACTION_ERROR,
        message: e.message
      })
      Helper.moduleErrLogMessager(dbError)
      next(new ApiError({ message: CARD_TRANSACTION_ERROR }))
    }
  }

  /**
   * Controllers used for intitalizing card transaction
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next
   * @returns { JSON } A JSON response containing the details of the contact us added
   * @memberof TransactionController
   */
  static async createBankTransaction (req, res, next) {
    try {
      const { banktransaction, user, wallet } = req
      const walletbalance = JSON.parse(wallet.balance)
      const trans = {
        user_id: user.id,
        wallet_id: wallet.id,
        operation: 'credit',
        narration: 'Flutterwave bank deposit',
        amount: banktransaction.transfer_amount,
        balance: walletbalance + banktransaction.transfer_amount
      }
      const transaction = new TransactionModel({
        ...trans
      })
      const data = await transaction.save()
      return successResponse(res, {
        message: BANK_TRANSACTION_SUCCESS,
        data: data
      })
    } catch (e) {
      const dbError = new DBError({
        status: BANK_TRANSACTION_ERROR,
        message: e.message
      })
      Helper.moduleErrLogMessager(dbError)
      next(new ApiError({ message: BANK_TRANSACTION_ERROR }))
    }
  }

  /**
   * Controllers used for intitalizing transfers
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next
   * @returns { JSON } A JSON response containing the details of the contact us added
   * @memberof TransactionController
   */
  static async createTransfer (req, res, next) {
    try {
      const { user, receiver, body, wallet, receiverwallet } = req
      const senderbal = Helper.parseData(wallet.balance)
      const receiverbal = Helper.parseData(receiverwallet.balance)
      const data = {
        from_wallet: wallet.id,
        to_wallet: receiverwallet.id,
        amount: body.amount,
        from_id: user.id,
        to_id: receiver.id,
        from_balance: senderbal - body.amount,
        to_balance: receiverbal + body.amount,
        from_name: user.first_name + ' ' + user.last_name,
        to_name: receiver.first_name + ' ' + receiver.last_name
      }
      const transaction = new TransactionModel({
        ...data
      })
      const d = await transaction.transfer()
      return successResponse(res, {
        message: TRANSFER_SUCCESS(data.to_name),
        data: d
      })
    } catch (e) {
      const dbError = new DBError({
        status: TRANSFER_ERROR_MESSAGE,
        message: e.message
      })
      Helper.moduleErrLogMessager(dbError)
      next(new ApiError({ message: TRANSFER_ERROR_MESSAGE }))
    }
  }

  // static async withdrawToBank (req, res, next) {
  //   try{

  //   } catch (e) {

  //   }
  // }
}

export default TransactionController
