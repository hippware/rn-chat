import takeScreenshot from './helpers'
import chalk from 'chalk'
import {expect} from 'detox'

describe('Detox', () => {
  // beforeEach(async () => {
  //   await device.reloadReactNative()
  // })

  it('shows onboarding screen', async () => {
    takeScreenshot('first-open')
    await expect(element(by.id('preConnection'))).toBeVisible()
    takeScreenshot('onboarding-visible')
  })

  it('navs to bypass register screen', async () => {
    await element(by.id('bypassButton')).tap()
    await expect(element(by.id('bypassPhoneInput'))).toBeVisible()
    takeScreenshot('bypass-register-visible')
  })

  it('registers bypass number and navs to new profile screen', async () => {
    try {
      await element(by.id('bypassPhoneInput')).typeText('0000044')
    } catch (err) {
      if (err.message.indexOf('keyboard was not shown on screen') > 0) {
        console.log(
          chalk.yellow(
            'NOTE: if this is a non-CI detox run, hardware keyboard is enabled. Please disable with Cmd-K on simulator.'
          )
        )
        throw err
      }
    }
    await element(by.id('bypassRegisterButton')).tap()
    takeScreenshot('register-tap')

    await waitFor(element(by.id('signUpTopRow')))
      .toBeVisible()
      .withTimeout(5000)

    takeScreenshot('signup-visible')
  })

  it('registers new bypass user and navs to home screen', async () => {
    try {
      // fill out the form and hit return
      await element(by.id('signUpUsername')).tap()
      // todo: something more random?
      await element(by.id('signUpUsername')).typeText('jklajiopas\n')
      takeScreenshot('signup-form-filled')

      // since we have the '\n' above we don't need to tap the 'done' button here
      // await element(by.id('signUpDone')).tap()
    } catch (err) {
      // todo: catch specific error
      console.log('& err', err.message, err.code, err)
      console.warn('Warning: No sign-up page, this user already exists')
    }
  })

  it('shows the onboarding swiper', async () => {
    await expect(element(by.id('onboardingSwiper'))).toBeVisible()

    // we must tap "Allow Accelerometer" since accelerometer checks always come back as "restricted" on a simulator
    await element(by.id('accelerometerPermissionButton')).tap()
    // onboardingFindFriends
    await expect(element(by.id('onboardingFindFriends'))).toBeVisible()
    await element(by.id('onboardingSkipFindFriends')).tap()
  })

  it('navs to home screen', async () => {
    // TODO: what is the next "visible" element/screen before we eventually make it to the home screen?
    // using `waitFor` is kind of a hack until we figure this out
    // https://github.com/wix/detox/blob/master/docs/APIRef.waitFor.md
    // await expect(element(by.id('screenHome'))).toBeVisible()
    await waitFor(element(by.id('screenHome')))
      .toBeVisible()
      .withTimeout(4000)
    takeScreenshot('home-screen')
  })

  // it('opens sidemenu', async () => {
  //   await element(by.id('wrapper')).tapAtPoint(navLeftButtonCoords)
  //   takeScreenshot('sidemenu-opening')
  //   await expect(element(by.id('myAccountMenuItem'))).toBeVisible()
  //   takeScreenshot('sidemenu-open')
  // })

  // it('navs to ProfileDetail screen', async () => {
  //   await element(by.id('myAccountMenuItem')).tap()
  //   // await expect(element(by.id('profileDetail'))).toBeVisible()
  //   await waitFor(element(by.id('profileDetail')))
  //     .toBeVisible()
  //     .withTimeout(1000)
  //   takeScreenshot('profile-detail')
  // })

  // it('navs to MyAccount screen', async () => {
  //   await element(by.id('myAccountEdit')).tap()
  //   await expect(element(by.id('profileInfo'))).toBeVisible()
  //   takeScreenshot('my-account')
  // })

  // it('logs out and deletes profile', async () => {
  //   await element(by.id('myAccountScrollView')).scrollTo('bottom')
  //   await element(by.id('deleteProfile')).tap()
  //   takeScreenshot('delete-tap')

  //   // NOTE: apparently 2 dialogs are created (?) so we must use `atIndex` to match just one
  //   await element(by.text('Delete Profile'))
  //     .atIndex(1)
  //     .tap()
  //   takeScreenshot('delete-profile-confirm')

  //   await waitFor(element(by.id('onboarding')))
  //     .toBeVisible()
  //     .withTimeout(2000)
  //   takeScreenshot('onboarding-after-delete')
  // })
})

const navLeftButtonCoords = {x: 35, y: 35}

function sleep(delay) {
  return new Promise(resolve => setTimeout(() => resolve(), delay))
}
