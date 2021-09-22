import Joi from 'joi'

import { ValidationHelper } from '../utils'

const { amountCheck, stringCheck } = ValidationHelper

const withdrawalSchema = Joi.object({
  amount: amountCheck('Amount', Joi, 100),
  account_no: stringCheck('Account No', Joi, 10, 10)
})

export default withdrawalSchema
