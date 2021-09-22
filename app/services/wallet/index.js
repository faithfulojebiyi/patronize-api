import queries from '../../db/queries/wallet'
import db from '../../db'

const {
  fetchWalletByUserId,
  fetchWalletById
} = queries

/**
 * Contains a collection of service methods for managing Wallet resource on the app.
 * @class WalletService
 */
class WalletService {
  /**
   * It Fetchs the wallet by userid
   * @param {string} userid - The userid of the Wallet to be fetched
   * @returns { Promise<Array<Wallet> | Error> } - A promise that resolves or rejects
   * with the Wallet resource or DB Error
   */
  static getWalletByUserId (userid) {
    return db.execute(fetchWalletByUserId, [userid])
  }

  /**
   * Fetches the wallet by id
   * @param {string} id - Th Wallet id to be fetched
   * @returns {Promise<Array<Wallet> | Error> } - A promise that resolves or rejects
   * witj the Wallet resource of DB Error
   */
  static getWalletById (id) {
    return db.execute(fetchWalletById, [id])
  }
}

export default WalletService
