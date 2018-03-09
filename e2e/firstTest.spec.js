// @flow
/* global device, element, by, waitFor */

describe('Example', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should successfully bypass register and get to home screen', async () => {
    await expect(element(by.id('onboarding'))).toBeVisible();
    await element(by.id('bypassButton')).tap();
    await element(by.id('bypassRegisterButton')).tap();

    // TODO: what is the next "visible" element/screen before we eventually make it to the home screen?
    // using `waitFor` is kind of a hack until we figure this out: https://github.com/wix/detox/blob/master/docs/Troubleshooting.RunningTests.md#test-tries-to-find-my-component-before-its-created

    await waitFor(element(by.id('screenHome')))
      .toBeVisible()
      .withTimeout(2000);

    // await expect(element(by.id('screenHome'))).toBeVisible();
  });
});
