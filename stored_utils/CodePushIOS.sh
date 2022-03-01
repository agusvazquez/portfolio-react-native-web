#!/bin/bash
echo "Starting Code Push flow for iOS version: " $1 "(" $2 ")"

yarn
yarn generate:production

appcenter codepush release-react --sourcemap-output -t $1 -a AppName/AppName-iOS -d $2 --output-dir ./build
export SENTRY_PROPERTIES=./ios/sentry.properties
./node_modules/@sentry/cli/bin/sentry-cli react-native appcenter --bundle-id com.AppNamehome --version-name $1 --deployment $2 AppName/AppName-iOS ios ./build/CodePush

echo "Code Push for version: " $1 "(" $2 ") completed successfully"
sleep 30s