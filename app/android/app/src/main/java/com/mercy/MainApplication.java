package com.mercy;

import android.app.Application;
import android.content.Context;
import android.support.multidex.MultiDex;

import com.facebook.CallbackManager;
import com.facebook.appevents.AppEventsLogger;
import com.facebook.react.ReactApplication;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.brentvatne.react.ReactVideoPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.swmansion.rnscreens.RNScreensPackage;
import com.swmansion.reanimated.ReanimatedPackage;
import com.rnprogresshud.RNProgressHUDPackage;
import fr.bamlab.rnimageresizer.ImageResizerPackage;
import com.imagepicker.ImagePickerPackage;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import io.invertase.firebase.RNFirebasePackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

import io.invertase.firebase.auth.RNFirebaseAuthPackage;
import io.invertase.firebase.firestore.RNFirebaseFirestorePackage;
import io.invertase.firebase.functions.RNFirebaseFunctionsPackage;
import io.invertase.firebase.storage.RNFirebaseStoragePackage;

public class MainApplication extends Application implements ReactApplication {

  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new AsyncStoragePackage(),
            new ReactVideoPackage(),
            new VectorIconsPackage(),
            new RNScreensPackage(),
            new ReanimatedPackage(),
            new RNProgressHUDPackage(),
            new ImageResizerPackage(),
            new ImagePickerPackage(),
            new RNGoogleSigninPackage(),
            new RNGestureHandlerPackage(),
            new RNFirebasePackage(),
            new FBSDKPackage(),
          new RNFirebasePackage(),
          new RNFirebaseAuthPackage(),
          new RNFirebaseStoragePackage(),
          new RNFirebaseFunctionsPackage(),
          new RNFirebaseFirestorePackage(),
          new RNGestureHandlerPackage(),
          new ImageResizerPackage(),
          new FBSDKPackage(mCallbackManager)
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
    AppEventsLogger.activateApp(this);
  }


  @Override
  protected void attachBaseContext(Context base) {
    super.attachBaseContext(base);
    MultiDex.install(this);
  }
}
