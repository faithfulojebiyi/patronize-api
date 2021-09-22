import constants from '../../flutterwave/constants'
import axios from 'axios'
import config from '../../../config'
import { Helper } from '../../flutterwave/helpers'

const {
  CARD_CHARGE_ENPOINT,
  VALIDATE_CHARGE_ENDPOINT,
  BANK_CHARGE_ENPOINT,
  BANK_TRANSFER_ENPOINT,
  RESOLVE_ACCOUNT_ENDPOINT,
  WITHDRAW_TRANSFER_ENDPOINT,
  VERIFY_TRANSACTION_ENDPOINT,
  VERIFY_TRANSFER_ENDPOINT
} = constants

/**
 * A collection of services methods for flutterwave
 * @class FlutterWaveService
 */
class FlutterWaveService {
  /**
   * @static
   * @memberOf FlutterWaveService
   * @param {Object} data - Data to be sent to fluttewave api
   * @returns {Object} response from flutterwave card service
   */
  static async chargeCard (data) {
    const stringifiedData = Helper.stringify(data)
    const encryptedData = Helper.encrypt(stringifiedData)
    const secret = config.FLUTTER_WAVE_SECRET_KEY
    const payload = {
      client: encryptedData
    }
    return await axios.post(CARD_CHARGE_ENPOINT, payload, {
      headers: {
        Authorization: `Bearer ${secret}`
      }
    })
  }

  /**
   * @static
   * @memberOf FlutterWaveService
   * @param {Object} data - Data to be sent to fluttewave api
   * @returns {Object} response from flutterwave card service
   */
  static async validateCardCharge (data) {
    const secret = config.FLUTTER_WAVE_SECRET_KEY
    return await axios.post(VALIDATE_CHARGE_ENDPOINT, data, {
      headers: {
        Authorization: `Bearer ${secret}`
      }
    })
  }

  /**
   * @static
   * @memberOf FlutterWaveService
   * @param {string} id - id to be sent to fluttewave api
   * @returns {Object} response from flutterwave card service
   */
  static async verifyCardPayment (id) {
    const secret = config.FLUTTER_WAVE_SECRET_KEY
    return await axios.get(VERIFY_TRANSACTION_ENDPOINT(id), {
      headers: {
        Authorization: `Bearer ${secret}`
      }
    })
  }

  /**
   * @static
   * @memberOf FlutterWaveService
   * @param {Object} data - Data to be sent to fluttewave api
   * @returns {Object} response from flutterwave bank service
   */
  static async chargeBank (data) {
    const secret = config.FLUTTER_WAVE_SECRET_KEY
    return await axios.post(BANK_CHARGE_ENPOINT, data, {
      headers: {
        Authorization: `Bearer ${secret}`
      }
    })
  }

  /**
   * @static
   * @memberOf FlutterWaveService
   * @param {Object} data - Data to be sent to fluttewave api
   * @returns {Object} response from flutterwave bank service
   */
  static async bankTransfer (data) {
    const secret = config.FLUTTER_WAVE_SECRET_KEY
    return await axios.post(BANK_TRANSFER_ENPOINT, data, {
      headers: {
        Authorization: `Bearer ${secret}`
      }
    })
  }

  /**
   * @static
   * @memberOf FlutterWaveService
   * @param {Object} data - Data to be sent to fluttewave api
   * @returns {Object} response from flutterwave account service
   */
  static async resolveAccountNo (data) {
    const secret = config.FLUTTER_WAVE_SECRET_KEY
    return await axios.post(RESOLVE_ACCOUNT_ENDPOINT, data, {
      headers: {
        Authorization: `Bearer ${secret}`
      }
    })
  }

  /**
   * @static
   * @memberOf FlutterWaveService
   * @param {Object} data - Data to be sent to fluttewave api
   * @returns {Object} response from flutterwave transfer service
   */
  static async transferToBank (data) {
    const secret = 'FLWSECK_TEST-SANDBOXDEMOKEY-X'
    return await axios.post(WITHDRAW_TRANSFER_ENDPOINT, data, {
      headers: {
        Authorization: `Bearer ${secret}`
      }
    })
  }

  /**
   * @static
   * @memberOf FlutterWaveService
   * @param {string} id - id to be sent to fluttewave api
   * @returns {Object} response from flutterwave card service
   */
  static async verifyTransfer (id) {
    const secret = 'FLWSECK_TEST-SANDBOXDEMOKEY-X'
    return await axios.get(VERIFY_TRANSFER_ENDPOINT(id), {
      headers: {
        Authorization: `Bearer ${secret}`
      }
    })
  }
}

export default FlutterWaveService
