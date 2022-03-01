#!/bin/bash
echo "Starting Code Push flow for Android" $1 "(" $2 ")"

yarn
yarn generate:production

appcenter codepush release-react --sourcemap-output -t $1 -a AppName/AppName-Android -d $2 --output-dir ./build
export SENTRY_PROPERTIES=./android/sentry.properties
./node_modules/@sentry/cli/bin/sentry-cli react-native appcenter --deployment $2 AppName/AppName-Android android ./build/CodePush

echo "Code Push for version: " $1 "(" $2 ") completed successfully"
sleep 30s