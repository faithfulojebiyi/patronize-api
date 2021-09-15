import Joi from 'joi'

import { ValidationHelper } from '../utils/helpers'

const { emailCheck, passwordCheck } = ValidationHelper

const signinSchema = Joi.object({
  email: emailCheck(Joi),
  password: passwordCheck(Joi)
})

export default signinSchema
