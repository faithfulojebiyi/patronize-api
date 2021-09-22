import db from '../db'
import queries from '../db/queries/beneficiary'
import { Helper } from '../utils'

const { createBeneficiary, fetchBeneficiaryById } = queries

/**
 * @class BeneficiaryModel
 */
class BeneficiaryModel {
  /**
   * This is a constructor for creating an instance of an Beneficiary.
   * @param { Object } options - contains the required properties for creating
   * the Beneficiary.
   * @returns { BeneficiaryModel } - An instance of the Beneficiary profile.
   * @constructor BeneficiaryModel
   */
  constructor (options) {
    this.id = Helper.generateId()
    this.user_id = options.user_id
    this.account_no = options.account_no
    this.bank_code = options.bank_code
    this.bank_name = options.bank_name
  }

  /**
   * Persists a new Beneficiary to the DB.
   * @memberof BeneficiaryModel
   * @returns { Promise<Object | Error> } A promise that resolves or rejects
   * with an Beneficiary object or a DB Error.
   */
  async save () {
    try {
      await db.execute(createBeneficiary, [
        this.id,
        this.user_id,
        this.account_no,
        this.bank_code,
        this.bank_name
      ])
      const [beneficiary] = await db.execute(fetchBeneficiaryById, [this.id])
      return beneficiary[0]
    } catch (e) {
      await db.rollback()
      throw e
    }
  }
}

export default BeneficiaryModel
