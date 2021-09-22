import queries from '../../db/queries/beneficiary'
import db from '../../db'

const {
  fetchBeneficiaryByUserId,
  fetchBeneficiaryByAccountNo
} = queries

/**
 *
 * Contains a collection of service methods for managing Beneficiaryresource on the app.
 * @class BenficiaryService
 */
class BeneficiaryService {
  /**
   * It fetches a beneficiary by user id
   * @param {string} userid - The userid of the beneficiary
   * @returns { Promise<Array<User> | Error> } - A promise that resolves or rejects
   * with the user resource or DB Error
   */
  static getBeneficiarybyUserId (userid) {
    return db.execute(fetchBeneficiaryByUserId, [userid])
  }

  /**
   * It fetches a beneficiary by accountno
   * @param {string} accountno - The account of the beneficiary
   * @returns { Promise<Array<User> | Error> } - A promise that resolves or rejects
   * with the user resource or DB Error
   */
  static getBeneficiarybyAccountNo (accountno) {
    return db.execute(fetchBeneficiaryByAccountNo, [accountno])
  }
}

export default BeneficiaryService
