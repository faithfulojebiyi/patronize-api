import faker from 'faker'

export const email = faker.internet.email()

export const userPassword = 'correctpass'

export const userSignup = {
  first_name: faker.name.firstName,
  last_name: faker.name.lastName,
  email,
  password: userPassword
}

export const invalidUserSignup = {
  first_name: faker.name.firstName,
  last_name: faker.name.lastName,
  email: email,
  password: '123456'
}

export const userSignin = {
  email: userSignup.email,
  password: userPassword
}

export const invalidUserSignin = {
  email: faker.internet.email(),
  password: faker.internet.password(10)
}
