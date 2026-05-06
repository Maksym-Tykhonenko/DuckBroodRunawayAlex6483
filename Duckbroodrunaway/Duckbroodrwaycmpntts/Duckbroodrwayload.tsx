// WelcomeLoader.tsx

import WebView from 'react-native-webview';
import {ImageBackground, ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Animated} from 'react-native';

const av = new Animated.Value(0);
av.addListener(() => {
  return;
});

const volcLertLoaderHTML = `
 <!DOCTYPE html>
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          margin: 0;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: transparent;
        }

        .loader {
          width: 64px;
          height: 64px;
          position: relative;
          background: #FFF;
          border-radius: 4px;
          overflow: hidden;
        }

        .loader:before {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 40px;
          height: 40px;
          transform: rotate(45deg) translate(30%, 40%);
          background: #ff9371;
          box-shadow: 32px -34px 0 5px #ff3d00;
          animation: slide 2s infinite ease-in-out alternate;
        }

        .loader:after {
          content: "";
          position: absolute;
          left: 10px;
          top: 10px;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #ff3d00;
          transform-origin: 35px 145px;
          animation: rotate 2s infinite ease-in-out;
        }

        @keyframes slide {
          0%, 100% { bottom: -35px; }
          25%, 75% { bottom: -2px; }
          20%, 80% { bottom: 2px; }
        }

        @keyframes rotate {
          0% { transform: rotate(-15deg); }
          25%, 75% { transform: rotate(0deg); }
          100% { transform: rotate(25deg); }
        }
      </style>
    </head>
    <body>
      <div class="loader"></div>
    </body>
  </html>
`;

const Duckbroodrwayload = () => {
  const navigation = useNavigation();

  //useEffect(() => {
  //  const volcLertTimer = setTimeout(() => {
  //    navigation.replace('Duckbroodrwayonb' as never);
  //  }, 6000);
//
  //  return () => clearTimeout(volcLertTimer);
  //}, [navigation]);

  return (
    <ImageBackground
      source={require('../../elements/images/duckbroodldrbg.png')}
      style={styles.volcLertImageBackground}
      resizeMode="cover">
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.volcLertWebviewDock}>
          <WebView
            originWhitelist={['*']}
            source={{html: volcLertLoaderHTML}}
            style={styles.volcLertWebview}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Duckbroodrwayload;

const styles = StyleSheet.create({
  volcLertImageBackground: {
    flex: 1,
  },
  volcLertWebviewDock: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  volcLertWebview: {
    backgroundColor: 'transparent',
    width: 260,
    height: 250,
  },
});
