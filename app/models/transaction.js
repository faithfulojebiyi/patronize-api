import db from '../db'
import queries from '../db/queries/transaction'
import walletquery from '../db/queries/wallet'
import { Helper } from '../utils'

const { createTransaction } = queries
const { fetchWalletById, updateWalletBalanceById } = walletquery
/**
 * @class TransactionModel
 */
class TransactionModel {
  /**
   * This is a constructor for creating an instance of an Transaction.
   * @param { Object } options - contains the required properties for creating
   * the Transaction.
   * @returns { TransactionModel } - An instance of the Benficiary profile.
   * @constructor TransactionModel
   */
  constructor (options) {
    this.id = options.id ? options.id : Helper.generateId()
    this.ids = Helper.generateId()
    this.user_id = options.user_id
    this.wallet_id = options.wallet_id
    this.operation = options.operation
    this.narration = options.narration
    this.amount = options.amount
    this.balance = options.balance
    this.from_id = options.from_id
    this.to_id = options.to_id
    this.from_name = options.from_name
    this.to_name = options.to_name
    this.from_balance = options.from_balance
    this.to_balance = options.to_balance
    this.from_wallet = options.from_wallet
    this.to_wallet = options.to_wallet
  }

  /**
   * Persists a new Transaction to the DB.
   * @memberof TransactionModel
   * @returns { Promise<Object | Error> } A promise that resolves or rejects
   * with an Transaction object or a DB Error.
   */
  async save () {
    try {
      await db.beginTransaction()
      await db.execute(createTransaction, [
        this.id,
        this.user_id,
        this.wallet_id,
        this.operation,
        this.narration,
        this.amount
      ])
      await db.execute(updateWalletBalanceById, [this.balance, this.wallet_id])
      await db.commit()
      const [data] = await db.execute(fetchWalletById, [this.wallet_id])
      return data[0]
    } catch (e) {
      await db.rollback()
      throw e
    }
  }

  /**
   * Persists a new Transaction to the DB.
   * @memberof TransactionModel
   * @returns { Promise<Object | Error> } A promise that resolves or rejects
   * with an Transaction object or a DB Error.
   */
  async transfer () {
    try {
      await db.beginTransaction()
      await db.execute(createTransaction, [
        this.id,
        this.from_id,
        this.from_wallet,
        'debit',
        `'Transfer to '${this.to_name}`,
        this.amount
      ])
      await db.execute(createTransaction, [
        this.ids,
        this.to_id,
        this.to_wallet,
        'credit',
        `'Transfer from '${this.from_name}`,
        this.amount
      ])
      await db.execute(updateWalletBalanceById, [this.from_balance, this.from_wallet])
      await db.execute(updateWalletBalanceById, [this.to_balance, this.to_wallet])
      await db.commit()
      const [data] = await db.execute(fetchWalletById, [this.from_wallet])
      return data[0]
    } catch (e) {
      await db.rollback()
      throw e
    }
  }
}

export default TransactionModel
