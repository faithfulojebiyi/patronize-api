import queries from '../../db/queries/user'
import db from '../../db'

const {
  fetchUserByEmail,
  fetchUserById
} = queries

/**
 * Contains a collection of service methods for managing User resource on the app.
 * @class UserService
 */
class UserService {
  /**
   * It Fetchs the use by email
   * @param {string} email - The email of the user to be fetched
   * @returns { Promise<Array<User> | Error> } - A promise that resolves or rejects
   * with the user resource or DB Error
   */
  static getUserByEmail (email) {
    return db.execute(fetchUserByEmail, [email])
  }

  /**
   * Fetches the use by id
   * @param {string} id - Th user id to be fetched
   * @returns {Promise<Array<User> | Error> } - A promise that resolves or rejects
   * witj the user resource of DB Error
   */
  static getUserById (id) {
    return db.execute(fetchUserById, [id])
  }
}

export default UserService
