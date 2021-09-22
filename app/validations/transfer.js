import Joi from 'joi'

import { ValidationHelper } from '../utils'

const { amountCheck, emailCheck } = ValidationHelper

const transferSchema = Joi.object({
  amount: amountCheck('Amount', Joi, 100),
  email: emailCheck(Joi)
})

export default transferSchema
