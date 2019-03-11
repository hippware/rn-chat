package com.hippware.android.tinyrobot;

import android.os.Bundle;
import com.facebook.react.ReactRootView;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactActivity;
import com.microsoft.codepush.react.CodePush;
import android.view.MotionEvent;
import com.rome2rio.android.reactnativetouchthroughview.TouchThroughTouchHandlerInterface;
import com.rome2rio.android.reactnativetouchthroughview.TouchThroughTouchHandler;

public class MainActivity extends ReactActivity implements TouchThroughTouchHandlerInterface {
    private ReactRootView mReactRootView;
    private ReactInstanceManager mReactInstanceManager;
    private TouchThroughTouchHandler touchThroughTouchHandler = new TouchThroughTouchHandler();

    // @Override
    // protected void onCreate(Bundle savedInstanceState) {
    // mReactInstanceManager = ReactInstanceManager.builder()
    // // ...
    // // Add CodePush package
    // .addPackage(new CodePush("aKbSrov0EFd-mvtC31iYca_W0EtFS1jJ7ITUE",
    // getApplicationContext(), BuildConfig.DEBUG))
    // // Get the JS Bundle File via Code Push
    // .setJSBundleFile(CodePush.getJSBundleFile())
    // // ...

    // .build();
    // mReactRootView.startReactApplication(mReactInstanceManager,
    // "MyReactNativeApp", null);

    // setContentView(mReactRootView);
    // }
    /**
     * Returns the name of the main component registered from JavaScript. This is
     * used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "App";
    }

    public TouchThroughTouchHandler getTouchThroughTouchHandler() {
        return touchThroughTouchHandler;
    }

    @Override
    public boolean dispatchTouchEvent(MotionEvent ev) {
        touchThroughTouchHandler.handleTouchEvent(ev);

        return super.dispatchTouchEvent(ev);
    }
}
