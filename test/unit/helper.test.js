import { expect } from 'chai'
import { Helper } from '../../app/utils'
import { userPassword } from '../fixtures/user'
import { payload, tokenData, userSchema, userData, singleArray, multiArray } from '../fixtures/helper'

const {
  generateId,
  generateTransactionRef,
  hashPassword,
  compareHash,
  generateToken,
  addTokenToData,
  verifyToken,
  validateInput,
  checkArrayIsNotEmpty
} = Helper

const empty = []

describe('Utility Helper Functions', () => {
  let hashedPassword
  let token
  let data
  it('generateId should generate a uuid', () => {
    const id = generateId()
    expect(id).to.be.a('string').of.length(36)
  })
  it('generateTransactionRef should generate a uuid', () => {
    const ref = generateTransactionRef()
    expect(ref).to.be.a('string')
  })
  it('hashPassword should hash a plain password', () => {
    hashedPassword = hashPassword(userPassword)
    expect(hashedPassword).to.be.a('string').of.length.greaterThan(40)
  })
  it('compareHash should compare hashed password to the plain value', () => {
    const comparedPassword = compareHash(userPassword, hashedPassword)
    expect(comparedPassword).to.be.a('boolean')
    expect(comparedPassword).to.be.a('boolean').equals(true)
  })
  it('generateToken should generate a string of token with different characters', () => {
    token = generateToken({ payload })
    expect(token).to.be.a('string').of.length.greaterThan(25)
  })
  it('addTokenToData should generate a user object with the token included', () => {
    data = addTokenToData(tokenData)
    expect(data).to.be.an('object')
  })
  it('verifyToken should decoded the token', () => {
    const token = data.token
    const decodedToken = verifyToken(token)
    expect(decodedToken).to.be.an('object')
    expect(decodedToken.email).to.be.equals(tokenData.email)
  })
  it('validateInput should validate an input using a schema', () => {
    try {
      validateInput(userSchema, userData)
    } catch (error) {
      expect(error).to.be.equal(null)
    }
  })
  it('checkArrayIsNotEmpty should check if an array is empty', () => {
    const data = checkArrayIsNotEmpty(empty)
    const single = checkArrayIsNotEmpty(singleArray)
    const array = checkArrayIsNotEmpty(multiArray)
    expect(data).to.be.a('null')
    expect(single).to.be.an('object')
    expect(array).to.be.an('array')
  })
})
