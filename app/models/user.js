import db from '../db'
import queries from '../db/queries/user'
import walletquery from '../db/queries/wallet'
import { Helper } from '../utils'

const { createUser, fetchUserById } = queries
const { createWallet } = walletquery

/**
 * @class UserModel
 */
class UserModel {
  /**
   * This is a constructor for creating an instance of an User.
   * @param { Object } options - contains the required properties for creating
   * the User.
   * @returns { UserModel } - An instance of the User profile.
   * @constructor UserModel
   */
  constructor (options) {
    this.id = Helper.generateId()
    this.walletid = Helper.generateId()
    this.first_name = options.first_name
    this.last_name = options.last_name
    this.email = options.email.toLowerCase()
    this.password = Helper.hashPassword(options.password)
    this.balance = options.balance ? options.balance : 0
  }

  /**
   * Persists a new User to the DB.
   * @memberof UserModel
   * @returns { Promise<Object | Error> } A promise that resolves or rejects
   * with an User object or a DB Error.
   */
  async save () {
    try {
      await db.beginTransaction()
      await db.execute(createUser, [
        this.id,
        this.first_name,
        this.last_name,
        this.email,
        this.password
      ])
      await db.execute(createWallet, [
        this.walletid,
        this.id,
        this.balance
      ])
      await db.commit()
      const [user] = await db.execute(fetchUserById, [this.id])
      return user[0]
    } catch (e) {
      await db.rollback()
      throw e
    }
  }
}

export default UserModel
