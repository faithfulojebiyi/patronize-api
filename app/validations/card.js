import Joi from 'joi'
import { ValidationHelper } from '../utils'
const { cardNumberCheck, amountCheck, stringCheck, enumCheck, emailCheck } = ValidationHelper

const cardSchema = Joi.object({
  card_number: cardNumberCheck('Card Number', Joi),
  cvv: stringCheck('Cvv', Joi, 3, 4),
  expiry_month: stringCheck('Expiry Month', Joi, 2, 2),
  expiry_year: stringCheck('Expiry Year', Joi, 2, 2),
  currency: enumCheck(['NGN'], 'Currency', Joi),
  amount: amountCheck('Amount', Joi),
  fullname: stringCheck('Full Name', Joi, 3, 100),
  email: emailCheck(Joi),
  authorization: Joi.object({
    mode: enumCheck(['pin'], 'Authorization.mode', Joi),
    pin: stringCheck('Authorization.pin', Joi, 4, 4)
  })
})

export default cardSchema
