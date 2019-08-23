package com.hippware.android.tinyrobot;

import android.os.Bundle;
import com.facebook.react.ReactRootView;
import com.facebook.react.ReactActivity;
import android.view.MotionEvent;
import com.rome2rio.android.reactnativetouchthroughview.TouchThroughTouchHandlerInterface;
import com.rome2rio.android.reactnativetouchthroughview.TouchThroughTouchHandler;
import com.facebook.react.ReactActivityDelegate;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;
import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity implements TouchThroughTouchHandlerInterface {
    private TouchThroughTouchHandler touchThroughTouchHandler = new TouchThroughTouchHandler();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);
        super.onCreate(savedInstanceState);
        NotificationChannelHelper.init(this);
    }

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

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new ReactActivityDelegate(this, getMainComponentName()) {
            @Override
            protected ReactRootView createRootView() {
                return new RNGestureHandlerEnabledRootView(MainActivity.this);
            }
        };
    }

}
