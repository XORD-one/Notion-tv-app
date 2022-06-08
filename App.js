/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView} from 'react-native';
import WebView from 'react-native-webview';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <WebView
        source={{
          uri: 'https://xord.notion.site/Xord-Homepage-170e039e39c24dffadefef0559e3257e',
        }}
        style={{width: '100%', height: '100%'}}
      />
    </SafeAreaView>
  );
};

export default App;
