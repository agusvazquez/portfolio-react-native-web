# AppName

##### Android

On root folder do

```
yarn install
```

To start the JS bundler server for development do:

```
yarn start
```

Launch android simulator using Android studio and then inside android folder do:

```
gradlew installDebug
```

```
gradlew bundleRelease
```

This will generate a .aab file for playstore upload on android/app/build/outputs/bundle folder

Note: You can also do gradlew assembleRelease to generate an APK located on android/app/build/outputs/apk folder.

##### iOS

On root folder do

```
yarn install
```

And inside ios folder do:

```
pod install
```

To start the JS bundler server for development do:

```
yarn start
```

Open the ./ios/AppNameHome.xcworkspace with xCode.

After selecting them simply do Product -> Archive.

Common issue: In order to Product -> Archive be enabled and not greyed out, no simulator must be selected as a target device.

##### Code Push

In order to make code push work, you need to install the following dependency.

```
npm config set unsafe-perm true
npm install -g appcenter-cli
```

Then login (you must have access to https://appcenter.ms/apps)

```
appcenter login
```

For listing the keys:

```
appcenter codepush deployment list -a AppName/AppName-iOS -k
appcenter codepush deployment list -a AppName/AppName-Android -k
```

##### Automatic

On the root folder just do

```
./CodePushAndroid.sh 1.0 Production
./CodePushIOS.sh 1.0 Production
```

##### Mannually

Publishing to CodePush

- Don't forget to change the version number.
- Create CodePush folders on ios and android folders.

##### Android:

```
appcenter codepush release-react --sourcemap-output -t 1.0 -a AppName/AppName-Android -d Production --output-dir ./build
export SENTRY_PROPERTIES=./android/sentry.properties
./node_modules/@sentry/cli/bin/sentry-cli react-native appcenter --deployment Production AppName/AppName-Android android ./build/CodePush
```

##### iOS:

```
appcenter codepush release-react --sourcemap-output -t 1.0 -a AppName/AppName-iOS -d Production --output-dir ./build
export SENTRY_PROPERTIES=./ios/sentry.properties
./node_modules/@sentry/cli/bin/sentry-cli react-native appcenter --deployment Production AppName/AppName-iOS ios ./build/CodePush
```

Known issues:

sentry-cli command seems not to work on a windows machine :(

Source: https://docs.microsoft.com/en-us/appcenter/distribution/codepush/react-native
