import forge from 'node-forge'

/**
 * contains Helper Methods for flutterwave
 * @class FlutterWaveHelper
 */
class FlutterWaveHelper {
  /**
   * It encrypts a data
   * @static
   * @param {string} key - The encryption key used for encryption
   * @param {string} text - The stringified format of the data to encrypt
   * @returns {string} - The encrypted data
   * @memberof FlutterWaveHelper
   */
  static encrypt (key, text) {
    const cipher = forge.cipher.createCipher(
      '3DES-CBC',
      forge.util.createBuffer(key)
    )
    cipher.start({
      iv: ''
    })
    cipher.update(forge.util.createBuffer(text, 'utf-8'))
    cipher.finish()
    const encrypted = cipher.output
    return forge.util.encode64(encrypted.getBytes())
  }

  /**
   * @static
   * @memberof FlutterWaveValidationHelper
   * @param {object} data - Object tp be stringified
   * @returns {string} the strigified data
   */
  static stringify (data) {
    return JSON.stringify(data)
  }
}

export default FlutterWaveHelper
