import { expect } from 'chai'
import { Helper } from '../../app/flutterwave/helpers'
import { userData } from '../fixtures/helper'

const { encrypt, stringify } = Helper

describe('Flutterwave Utility Helper Functions', () => {
  let data
  it('stringify should stringify an object', () => {
    data = stringify(userData)
    expect(data).to.be.a('string')
  })
  it('encrypt should encrypt a string', () => {
    const encrypted = encrypt(data)
    expect(encrypted).to.be.a('string')
  })
})
