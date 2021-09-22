import Joi from 'joi'

import { ValidationHelper } from '../utils'

const { stringCheck } = ValidationHelper

const chargeOtpSchema = Joi.object({
  otp: stringCheck('OTP', Joi, 5, 8),
  flw_ref: stringCheck('FLW_REF', Joi, 5, 100)
})

export default chargeOtpSchema
