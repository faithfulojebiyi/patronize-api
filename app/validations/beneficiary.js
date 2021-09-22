import Joi from 'joi'

import { ValidationHelper } from '../utils'

const { stringCheck } = ValidationHelper

const beneficiarySchema = Joi.object({
  account_no: stringCheck('Account No', Joi, 10, 10),
  bank_code: stringCheck('Bank Code', Joi, 3, 10),
  bank_name: stringCheck('Bank Name', Joi, 2, 100)
})

export default beneficiarySchema
