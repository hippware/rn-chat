/* global device, element, by, waitFor, before */

const navLeftButtonCoords = {x: 35, y: 35}

describe('Detox', () => {
  before(async () => {
    // set permissions before running any tests: https://github.com/wix/detox/blob/master/docs/APIRef.DeviceObjectAPI.md#devicelaunchappparams
    await device.launchApp({permissions: {location: 'always', notifications: 'YES'}})
  })

  it('should successfully bypass register and get to home screen', async () => {
    await expect(element(by.id('onboarding'))).toBeVisible()
    await element(by.id('bypassButton')).tap()
    await element(by.id('bypassPhoneInput')).typeText('222')
    await element(by.id('bypassRegisterButton')).tap()

    // TODO: what is the next "visible" element/screen before we eventually make it to the home screen?
    // using `waitFor` is kind of a hack until we figure this out
    // https://github.com/wix/detox/blob/master/docs/APIRef.waitFor.md
    await waitFor(element(by.id('screenHome')))
      .toBeVisible()
      .withTimeout(4000)
    await expect(element(by.id('screenHome'))).toBeVisible()

    // TODO: wocky-client mock with repackager
    // https://github.com/wix/detox/blob/master/docs/Guide.Mocking.md
  })

  it('should open sidemenu', async () => {
    await element(by.id('wrapper')).tapAtPoint(navLeftButtonCoords)
    await expect(element(by.id('myAccountMenuItem'))).toBeVisible()
  })

  it('should navigate to ProfileDetail screen', async () => {
    await element(by.id('myAccountMenuItem')).tap()
    // await expect(element(by.id('profileDetail'))).toBeVisible()
    await waitFor(element(by.id('profileDetail')))
      .toBeVisible()
      .withTimeout(1000)
  })

  it('should navigate to MyAccount screen', async () => {
    await element(by.id('myAccountEdit')).tap()
    await expect(element(by.id('profileInfo'))).toBeVisible()
  })

  it('should logout', async () => {
    await element(by.id('logout')).tap()
    // NOTE: apparently 2 dialogs are created (?) so we must use `atIndex` to match just one
    await element(by.text('Log Out'))
      .atIndex(1)
      .tap()
    await waitFor(element(by.id('onboarding')))
      .toBeVisible()
      .withTimeout(2000)
  })
})
