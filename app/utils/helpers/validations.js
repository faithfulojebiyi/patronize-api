/**
 * constain Validation Helpers
 * @class ValidationHelper
 */
class ValidationHelper {
  /**
   * It validates a number with minimum and maximum value
   * @static
   * @param {string} param - The field name
   * @param {object} joiObject - joi object used
   * @param {integer} min - The minimum value required
   * @param {integer} max - The maximum value required
   * @memberof ValidationHelper
   * @returns {Boolean} - True or False
   */
  static numberCheck (param, joiObject, min, max) {
    return joiObject
      .number()
      .required()
      .min(min)
      .max(max)
      .messages({
        'any.required': `${param} is a required field`,
        'number.base': `${param} must be a number`,
        'number.empty': `${param} cannot be an empty field`,
        'number.min': `${param} can not be lesser than ${min}`,
        'number.max': `${param} can not be greater than ${max}`
      })
  }

  /**
   * It validates a string
   * @static
   * @memberof ValidationHelper
   * @param {string} param - The name of the field to validate
   * @param {object} joiObject - The joi object
   * @param {integer} min - The minimum value of the field
   * @param {integer} max - The maximum value of the field
   * @returns {Boolean} - True or false
   */
  static stringCheck (param, joiObject, min = 1, max = 100) {
    return joiObject
      .string()
      .required()
      .min(min)
      .max(max)
      .messages({
        'any.required': `${param} is a required field`,
        'string.max': `${param} can not be lesser than ${max} characters`,
        'string.min': `${param} can not be lesser than ${min} characters`,
        'string.base': `${param} must be a string`,
        'string.empty': `${param} cannot be an empty field`
      })
  }

  /**
   * It validates a string is part of an enum.
   * @static
   * @memberof ValidationHelper
   * @param {array} fields - An arry of enum fields
   * @param {string} param - The name of the field to validate
   * @param {object} joiObject - The joi object
   * @returns {Boolean} - True or false
   */
  static enumCheck (fields, param, joiObject) {
    return joiObject
      .string()
      .required()
      .valid(...fields)
      .messages({
        'string.empty': `${param} must not be an empty field`,
        'any.required': `${param} is a required field`,
        'any.only': `Please enter a valid ${param}`
      })
  }

  /**
   * It validate a password
   * @static
   * @memberof ValidationHelper
   * @param {object} joiObject - The joi object
   * @returns {Boolean} - True or false
   */
  static passwordCheck (joiObject) {
    return joiObject
      .string()
      .trim()
      .required()
      .min(7)
      .messages({
        'string.base': 'Password must be a string',
        'string.empty': 'Password field cannot be an empty field',
        'any.required': 'Password field is required',
        'string.min': 'Password can not be lesser than 7 characters'
      })
  }

  /**
   * It validate a phonenumber
   * @static
   * @memberof ValidationHelper
   * @param {object} joiObject - The joi object
   * @returns {Boolean} - True or false
   */
  static phoneNumberCheck (joiObject) {
    const re = /^[0-9]{11,14}$/
    return joiObject
      .string()
      .required()
      .pattern(new RegExp(re))
      .messages({
        'string.pattern.base': 'Phone number must be a number between 11 and 14 digits',
        'string.empty': 'Phone number must not be an empty field',
        'any.required': 'Phone number  is a required field'
      })
  }

  /**
   * It validate an email
   * @static
   * @memberof ValidationHelper
   * @param {object} joiObject - The joi object
   * @returns {Boolean} - True or false
   */
  static emailCheck (joiObject) {
    return joiObject
      .string()
      .email()
      .required()
      .messages({
        'any.required': 'Email is a required field',
        'string.email': 'Email is not valid',
        'string.empty': 'Email cannot be an empty field'
      })
  }

  /**
   * It validates a uuid
   * @static
   * @memberof ValidationHelper
   * @param {string} param - The name of the field to validate
   * @param {object} joiObject - The joi object
   * @returns {Boolean} - True or false
   */
  static uuidCheck (param, joiObject) {
    return joiObject
      .string()
      .guid()
      .required()
      .messages({
        'any.required': `${param} is a required field`,
        'string.base': `${param} must be a string`,
        'string.guid': `${param} must be a valid uuid`,
        'string.empty': `${param} cannot be an empty field`
      })
  }

  /**
   * It validates a uuid
   * @static
   * @memberof ValidationHelper
   * @param {string} param - The name of the field to validate
   * @param {object} joiObject - The joi object
   * @returns {Boolean} - True or false
   */
  static uriCheck (param, joiObject) {
    return joiObject
      .string()
      .uri()
      .required()
      .messages({
        'any.required': `${param} is a required field`,
        'string.base': `${param} must be a string`,
        'string.uri': `${param} must be a valid url`,
        'string.empty': `${param} cannot be an empty field`
      })
  }

  /**
   * It validates an array
   * @static
   * @memberof ValidationHelper
   * @param {string} param - The name of the field to validate
   * @param {integer} length - The Length of the array
   * @param {object} joiObject - The joi object
   * @returns {Boolean} - True or false
   */
  static arrayCheck (param, length, joiObject) {
    return joiObject
      .array()
      .items(joiObject.number())
      .length(length)
      .required()
      .messages({
        'array.empty': `${param} is a required field`,
        'array.base': `${param} must be a valid array`,
        'any.required': `${param} cannot be an empty field`
      })
  }

  /**
   * It validates a card number with minimum and maximum value
   * @static
   * @param {string} param - The field name
   * @param {object} joiObject - joi object used
   * @memberof FlutterWaveValidationHelper
   * @returns {Boolean} - True or False
   */
  static cardNumberCheck (param, joiObject) {
    return joiObject
      .string()
      .required()
      .creditCard()
      .messages({
        'any.required': `${param} is a required field`,
        'string.base': `${param} must be a string`,
        'string.empty': `${param} cannot be an empty field`,
        'string.creditCard': `${param} must be a valid card number`
      })
  }

  /**
   * It validates a number with minimum and maximum value
   * @static
   * @param {string} param - The field name
   * @param {object} joiObject - joi object used
   * @param {integer} min - The minimum value required
   * @param {integer} max - The maximum value required
   * @memberof FlutterWaveValidationHelper
   * @returns {Boolean} - True or False
   */
  static amountCheck (param, joiObject) {
    return joiObject
      .number()
      .required()
      .messages({
        'any.required': `${param} is a required field`,
        'number.base': `${param} must be a number`,
        'number.empty': `${param} cannot be an empty field`
      })
  }
}

export default ValidationHelper
