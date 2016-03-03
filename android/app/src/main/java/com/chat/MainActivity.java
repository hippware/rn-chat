package com.chat;

import com.facebook.react.ReactActivity;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.proxima.RCTDigits.DigitsPackage;
import com.imagepicker.ImagePickerPackage;
import com.lwansbrough.ReactCamera.ReactCamera;
import com.mapbox.reactnativemapboxgl.ReactNativeMapboxGLPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import java.util.Arrays;
import java.util.List;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "Chat";
    }

    /**
     * Returns whether dev mode should be enabled.
     * This enables e.g. the dev menu.
     */
    @Override
    protected boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
    }

   /**
   * A list of packages used by the app. If the app uses additional views
   * or modules besides the default ones, add more packages here.
   */
    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
        new MainReactPackage(),
        new RNDeviceInfo(),
        new DigitsPackage(),
        new ImagePickerPackage(),
        new ReactCamera(),
        new ReactNativeMapboxGLPackage(),
        new LinearGradientPackage()
      );
    }
}
