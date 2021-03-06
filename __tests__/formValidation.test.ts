import validate from 'validate.js'
import {validateProfile} from '../src/utils/formValidation'

declare module 'validate.js' {
  // tslint:disable-next-line
  interface ValidateJS {
    Promise: any
  }
}

validate.validators.usernameUniqueValidator = value => {
  // if (!value) return new validate.Promise(res => res());
  return new validate.Promise(resolve => {
    resolve()
  })
}

describe('form validation', () => {
  it('happy path - English', async () => {
    const obj = {
      firstName: 'Jenny',
      lastName: 'Ong',
      handle: 'jeenee',
      email: 'jenny@jenny.com',
    }
    const result = await validateProfile(obj)
    expect(result).toStrictEqual(obj)
  })

  it('handle with underscore', async () => {
    const obj = {handle: 'jee_nee'}
    const result = await validateProfile(obj)
    expect(result).toStrictEqual(obj)
  })

  it('short handle', async () => {
    try {
      await validateProfile({handle: 'tw'})
    } catch (err) {
      expect(err).toStrictEqual({
        handle: ['Handle must be 3 - 16 characters'],
      })
    }
  })

  it('hyphenated handle', async () => {
    try {
      await validateProfile({handle: 'hyphen-boy'})
    } catch (err) {
      expect(err).toStrictEqual({
        handle: ['Handle can only contain alphanumeric characters and _'],
      })
    }
  })

  it('handle with non Rmonan characters', async () => {
    try {
      await validateProfile({handle: '😀 -boy'})
    } catch (err) {
      expect(err).toStrictEqual({
        handle: ['Handle can only contain alphanumeric characters and _'],
      })
    }
  })

  it('first name starts with space', async () => {
    try {
      await validateProfile({firstName: ' Eric'})
    } catch (err) {
      expect(err).toStrictEqual({
        firstName: ['First name is invalid'],
      })
    }
  })

  it('first name ends with space', async () => {
    try {
      await validateProfile({firstName: 'Eric '})
    } catch (err) {
      expect(err).toStrictEqual({
        firstName: ['First name can only contain alphabet characters'],
      })
    }
  })

  it('first name with apostrophe', async () => {
    const obj = {firstName: "Eric'apostrophe"}
    const result = await validateProfile(obj)
    expect(result).toStrictEqual(obj)
  })

  it('first name with numbers', async () => {
    const obj = {firstName: 'Eric1234Kirkham'}
    const result = await validateProfile(obj)
    expect(result).toStrictEqual(obj)
  })

  it('bad email', async () => {
    try {
      await validateProfile({email: 'eric@e'})
    } catch (err) {
      expect(err).toStrictEqual({
        email: ['Email is not a valid email'],
      })
    }
  })

  it('first name with non-English characters', async () => {
    const obj = {firstName: 'ÚБ見'}
    const result = await validateProfile(obj)
    expect(result).toStrictEqual(obj)
  })

  // #1503
  it('accepts short first name', async () => {
    const obj = {firstName: 'T'}
    const result = await validateProfile(obj)
    expect(result).toStrictEqual(obj)
  })
})
