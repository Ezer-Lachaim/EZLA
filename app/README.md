# Android

> NOTE: In order to run or build the app you'll need [Android Studio](https://developer.android.com/studio) and the latest SDK.

## Assets (Icon & Splash screen)

`@capacitor/assets` is used to generate the assets. See [here](https://capacitorjs.com/docs/guides/splash-screens-and-icons) for more details.

## Run (on a "local" phone)

1. [Enable USB debugging](https://developer.android.com/studio/debug/dev-options)
2. Connect the phone to the computer and allow USB debugging
3. Run `npm run -w ./app android:run`
4. The app should launch on the phone :)

## Build (create a signed AAB file)

1. Get the keystore and the passwords
2. Run `KEYSTORE_PATH=<keystore path> KEYSTORE_PASS=<keystore password> KEYSTORE_ALIAS=<keystore alias> $KEYSTORE_ALIAS_PASS <keystore_alias_pass> npm run -w ./app build:android`
3. The ABB file is at `./android/app/build/outputs/bundle/release/app-release-signed.aab`
