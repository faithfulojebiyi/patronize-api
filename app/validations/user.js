import Joi from 'joi'
import { ValidationHelper } from '../utils'

const { emailCheck, passwordCheck, stringCheck } = ValidationHelper

export const userSchema = Joi.object({
  first_name: stringCheck('First name', Joi, 3),
  last_name: stringCheck('Last name', Joi, 3),
  email: emailCheck(Joi),
  password: passwordCheck(Joi)
})

export default userSchema
