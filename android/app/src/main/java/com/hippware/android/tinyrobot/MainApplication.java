package com.hippware.android.tinyrobot;

import androidx.multidex.MultiDexApplication;

import com.facebook.react.ReactApplication;
import io.invertase.firebase.RNFirebasePackage;
import com.reactnativecommunity.netinfo.NetInfoPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.zaguiini.RNPureJwt.RNPureJwtPackage;
import com.actionsheet.ActionSheetPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.levelasquez.androidopensettings.AndroidOpenSettingsPackage;
import ca.jaysoo.extradimensions.ExtraDimensionsPackage;
import com.reactcommunity.rnlocalize.RNLocalizePackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.microsoft.codepush.react.CodePush;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.transistorsoft.rnbackgroundgeolocation.RNBackgroundGeolocation;
import com.bugsnag.BugsnagReactNative;
import com.BV.LinearGradient.LinearGradientPackage;
import com.rnfs.RNFSPackage;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.auth.RNFirebaseAuthPackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.links.RNFirebaseLinksPackage;
import com.kevinejohn.RNMixpanel.RNMixpanel;
import com.rome2rio.android.reactnativetouchthroughview.TouchThroughViewPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.rt2zz.reactnativecontacts.ReactNativeContacts;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends MultiDexApplication implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

    @Override
    protected String getJSBundleFile() {
      return CodePush.getJSBundleFile();
    }

    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(new MainReactPackage(),
            new RNFirebasePackage(),
            new NetInfoPackage(),
            new SplashScreenReactPackage(), new RNPureJwtPackage(), new ActionSheetPackage(),
          new PickerPackage(), new AndroidOpenSettingsPackage(), new ExtraDimensionsPackage(), new RNLocalizePackage(),
          new RNBackgroundGeolocation(), BugsnagReactNative.getPackage(), new ReactNativePushNotificationPackage(),
          new LinearGradientPackage(), new RNFSPackage(), new TouchThroughViewPackage(), new RNMixpanel(),
          new RNDeviceInfo(true),
          new CodePush(getResources().getString(R.string.reactNativeCodePush_androidDeploymentKey),
              getApplicationContext(), BuildConfig.DEBUG),
          new RNGestureHandlerPackage(), new RNFirebasePackage(), new RNFirebaseAuthPackage(),
          new RNFirebaseMessagingPackage(), new RNFirebaseLinksPackage(), new MapsPackage(),
          new ReactNativeConfigPackage(), new ReactNativeContacts());
    }

    // todo: this is available...but how do we use it?
    // @Override
    // public List<ReactPackage> createAdditionalReactPackages() {
    //     return Arrays.<ReactPackage>asList(...);
    // }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
