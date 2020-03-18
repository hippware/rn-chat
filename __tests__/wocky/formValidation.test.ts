import validate from 'validate.js'
import {Profile} from '../../src/wocky'

declare module 'validate.js' {
  // tslint:disable-next-line
  interface ValidateJS {
    Promise: any
  }
}

const obj = {
  id: '1',
  firstName: 'Jenny',
  lastName: 'Ong',
  handle: 'jeenee',
  email: 'jenny@jenny.com',
}

validate.validators.usernameUniqueValidator = value => {
  // if (!value) return new validate.Promise(res => res());
  return new validate.Promise(resolve => {
    resolve()
  })
}

describe('form validation', () => {
  // it('happy path - English', async () => {
  //   const profile = Profile.create(obj)
  //   await profile.validate()
  //   expect(profile.isValid).toBeTruthy()
  // })

  // it('handle with underscore', async () => {
  //   const profile = Profile.create({...obj, handle: 'jee_nee'})
  //   await profile.validate()
  //   expect(profile.isValid).toBeTruthy()
  // })

  it('short handle', async () => {
    const profile = Profile.create({...obj, handle: 'je'})
    await profile.validate()
    expect(profile.isValid).toBeFalsy()
    expect(profile.errors).toStrictEqual({
      handle: ['Handle must be 3 - 16 characters'],
    })
  })

  it('hyphenated handle', async () => {
    const profile = Profile.create({...obj, handle: 'hyphen-boy'})
    await profile.validate()
    expect(profile.isValid).toBeFalsy()
    expect(profile.errors).toStrictEqual({
      handle: ['Handle can only contain alphanumeric characters and _'],
    })
  })

  it('handle with non Rmonan characters', async () => {
    const profile = Profile.create({...obj, handle: '😀 -boy'})
    await profile.validate()
    expect(profile.isValid).toBeFalsy()
    expect(profile.errors).toStrictEqual({
      handle: ['Handle can only contain alphanumeric characters and _'],
    })
  })

  it('first name starts with space', async () => {
    const profile = Profile.create({...obj, firstName: ' Eric'})
    await profile.validate()
    expect(profile.isValid).toBeFalsy()
    expect(profile.errors).toStrictEqual({
      firstName: ['First name is invalid'],
    })
  })

  it('first name ends with space', async () => {
    const profile = Profile.create({...obj, firstName: 'Eric '})
    await profile.validate()
    expect(profile.isValid).toBeFalsy()
    expect(profile.errors).toStrictEqual({
      firstName: ['First name can only contain alphabet characters'],
    })
  })

  // it('first name with apostrophe', async () => {
  //   const obj = {firstName: "Eric'apostrophe"}
  //   const result = await validateProfile(obj)
  //   expect(result).toStrictEqual(obj)
  // })

  // it('first name with numbers', async () => {
  //   const obj = {firstName: 'Eric1234Kirkham'}
  //   const result = await validateProfile(obj)
  //   expect(result).toStrictEqual(obj)
  // })

  // it('first name with non-English characters', async () => {
  //   const obj = {firstName: 'ÚБ見'}
  //   const result = await validateProfile(obj)
  //   expect(result).toStrictEqual(obj)
  // })

  // it('accepts short first name', async () => {
  //   const obj = {firstName: 'T'}
  //   const result = await validateProfile(obj)
  //   expect(result).toStrictEqual(obj)
  // })
})
