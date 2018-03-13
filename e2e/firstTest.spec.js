// @flow
/* global device, element, by, waitFor, before */

describe('Example', () => {
  before(async () => {
    // set permissions before running any tests: https://github.com/wix/detox/blob/master/docs/APIRef.DeviceObjectAPI.md#devicelaunchappparams
    await device.launchApp({permissions: {location: 'always', notifications: 'YES'}});
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should successfully bypass register and get to home screen', async () => {
    await expect(element(by.id('onboarding'))).toBeVisible();
    await element(by.id('bypassButton')).tap();
    await element(by.id('bypassRegisterButton')).tap();

    // TODO: what is the next "visible" element/screen before we eventually make it to the home screen?
    // using `waitFor` is kind of a hack until we figure this out
    // https://github.com/wix/detox/blob/master/docs/APIRef.waitFor.md
    await waitFor(element(by.id('screenHome')))
      .toBeVisible()
      .withTimeout(2000);
    // await expect(element(by.id('screenHome'))).toBeVisible();

    // TODO: wocky-client mock with repackager
    // https://github.com/wix/detox/blob/master/docs/Guide.Mocking.md
  });
});
