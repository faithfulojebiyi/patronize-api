import faker from 'faker'
import { ValidationHelper } from '../../app/utils'
import Joi from 'joi'

export const payload = 'The payload to convert to token'
export const key = 'TheEncryptionKey'
export const { emailCheck, passwordCheck, stringCheck } = ValidationHelper

export const tokenData = {
  id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  email: faker.internet.email(),
  is_complete_step: true
}

export const userSchema = Joi.object({
  first_name: stringCheck('first_name', Joi, 3),
  last_name: stringCheck('last_name', Joi, 3),
  email: emailCheck(Joi),
  password: passwordCheck(Joi)
})

export const userData = {
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  email: faker.internet.email(),
  password: 'userPassword'
}

export const singleArray = [
  {
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: faker.internet.email(),
    password: 'userPassword'
  }
]

export const multiArray = [
  {
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: faker.internet.email(),
    password: 'userPassword'
  },
  {
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: faker.internet.email(),
    password: 'userPassword'
  }
]
