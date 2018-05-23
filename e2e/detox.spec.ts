require('./init')

// const {takeScreenshot} = require('./helpers')
import takeScreenshot from './helpers'

const navLeftButtonCoords = {x: 35, y: 35}

describe('Detox', () => {
  before(async () => {
    // set permissions before running any tests: https://github.com/wix/detox/blob/master/docs/APIRef.DeviceObjectAPI.md#devicelaunchappparams
    await device.launchApp({permissions: {location: 'always', notifications: 'YES'}})
  })

  afterEach(async () => {
    takeScreenshot()
  })

  it('should successfully bypass register new user and get to home screen', async () => {
    await expect(element(by.id('onboarding'))).toBeVisible()
    takeScreenshot('onboarding-visible')
    await element(by.id('bypassButton')).tap()
    await element(by.id('bypassPhoneInput')).typeText('444')
    await element(by.id('bypassRegisterButton')).tap()
    takeScreenshot('register-tap')

    await waitFor(element(by.id('signUpTopRow')))
      .toBeVisible()
      .withTimeout(3000)
    takeScreenshot('signup-visible')

    // fill out the form and hit return on the last entry
    await element(by.id('signUpUsername')).tap()
    await element(by.id('signUpUsername')).typeText(makeid(8))
    await element(by.id('signUpFirstName')).tap()
    await element(by.id('signUpFirstName')).typeText('four')
    await element(by.id('signUpLastName')).tap()
    await element(by.id('signUpLastName')).typeText('four')
    await element(by.id('signUpEmail')).tap()
    await element(by.id('signUpEmail')).typeText('email@email.com\n')
    takeScreenshot('signup-form-filled')

    // TODO: what is the next "visible" element/screen before we eventually make it to the home screen?
    // using `waitFor` is kind of a hack until we figure this out
    // https://github.com/wix/detox/blob/master/docs/APIRef.waitFor.md
    // await expect(element(by.id('screenHome'))).toBeVisible()
    await waitFor(element(by.id('screenHome')))
      .toBeVisible()
      .withTimeout(4000)
    takeScreenshot('home-screen')
  })

  it('should open sidemenu', async () => {
    await element(by.id('wrapper')).tapAtPoint(navLeftButtonCoords)
    takeScreenshot('sidemenu-opening')
    await expect(element(by.id('myAccountMenuItem'))).toBeVisible()
  })

  it('should navigate to ProfileDetail screen', async () => {
    await element(by.id('myAccountMenuItem')).tap()
    // await expect(element(by.id('profileDetail'))).toBeVisible()
    await waitFor(element(by.id('profileDetail')))
      .toBeVisible()
      .withTimeout(1000)
    takeScreenshot('profile-detail')
  })

  it('should navigate to MyAccount screen', async () => {
    await element(by.id('myAccountEdit')).tap()
    await expect(element(by.id('profileInfo'))).toBeVisible()
    takeScreenshot('my-account')
  })

  it('should logout and delete profile', async () => {
    await element(by.id('myAccountScrollView')).scrollTo('bottom')
    await element(by.id('deleteProfile')).tap()
    takeScreenshot('delete-tap')

    // NOTE: apparently 2 dialogs are created (?) so we must use `atIndex` to match just one
    await element(by.text('Delete Profile'))
      .atIndex(1)
      .tap()
    takeScreenshot('delete-profile-confirm')

    await waitFor(element(by.id('onboarding')))
      .toBeVisible()
      .withTimeout(2000)
    takeScreenshot('onboarding-after-delete')
  })
})

function makeid(length) {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

  for (let i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length))

  return text
}
