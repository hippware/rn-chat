package com.tinyrobot.tinyrobotStaging;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.xgfe.reactnativeenv.RCTNativeEnvPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.rnfs.RNFSPackage;
import io.invertase.firebase.RNFirebasePackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.kevinejohn.RNMixpanel.RNMixpanel;
import com.rome2rio.android.reactnativetouchthroughview.TouchThroughViewPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RCTNativeEnvPackage(BuildConfig.class),
            new LinearGradientPackage(),
            new RNFSPackage(),
            new RNFirebasePackage(),
            new MapsPackage(),
            new RNMixpanel(),
            new TouchThroughViewPackage()
      );
    }

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
