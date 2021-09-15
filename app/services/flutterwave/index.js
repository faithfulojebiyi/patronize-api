import { Helper as flutterwaveHelper } from '../../flutterwave/helpers'
import constants from '../../flutterwave/constants'
import axios from 'axios'
import config from '../../../config'

const { CARD_CHARGE_ENPOINT, VALIDATE_CHARGE_ENDPOINT, BANK_CHARGE_ENPOINT, BANK_TRANSFER_ENPOINT } = constants
const { encrypt, stringify } = flutterwaveHelper

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
    const stringifiedData = stringify(data)
    const encryptedData = encrypt(stringifiedData)
    const secret = config.FLUTTER_WAVE_SECRET_KEY
    return await axios.post(CARD_CHARGE_ENPOINT, encryptedData, {
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
   * @param {Object} data - Data to be sent to fluttewave api
   * @returns {Object} response from flutterwave card service
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
   * @returns {Object} response from flutterwave card service
   */
  static async bankTransfer (data) {
    const secret = config.FLUTTER_WAVE_SECRET_KEY
    return await axios.post(BANK_TRANSFER_ENPOINT, data, {
      headers: {
        Authorization: `Bearer ${secret}`
      }
    })
  }
}

export default FlutterWaveService
