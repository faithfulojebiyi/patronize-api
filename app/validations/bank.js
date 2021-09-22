import Joi from 'joi'

import { ValidationHelper } from '../utils'

const { amountCheck, enumCheck, emailCheck, stringCheck } = ValidationHelper

const bankSchema = Joi.object({
  amount: amountCheck('Amount', Joi, 100),
  currency: enumCheck(['NGN'], 'Currency', Joi),
  fullname: stringCheck('Full Name', Joi, 3, 100),
  email: emailCheck(Joi)
})

export default bankSchema
