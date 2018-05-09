/* global device, element, by, waitFor, before */

describe('Detox', () => {
  // beforeEach(async () => {
  //   await device.reloadReactNative()
  // })

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
    // this throws iOS error: 'Error: *** -[__NSPlaceholderArray initWithObjects:count:]: attempt to insert nil object from objects[0]'
    await element(by.id('wrapper')).tapAtPoint({x: 35, y: 35})
    await expect(element(by.id('myAccountMenuItem'))).toBeVisible()
  })

  // await element(by.id('screenHome')).swipe('right', 'fast', 0.99)

  // it('should logout', async () => {

  // })
})
