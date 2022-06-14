import {StyleSheet, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import WebView from 'react-native-webview';
import {useFocusEffect, useRoute} from '@react-navigation/native';

const NotionView = () => {
  const route = useRoute();
  const [count, setCount] = useState(0);
  const [uri, setUri] = useState('');

  let screens = [];

  useFocusEffect(() => {
    screens = route.params?.screens;
    const screenTime = route.params?.screenTime;
    const interval = setInterval(() => {
      updateCount();
    }, screenTime * 60 * 1000);

    return () => {
      clearInterval(interval);
    };
  });

  useEffect(() => {
    setUri(screens[count]);
  }, [count]);

  const updateCount = () => {
    if (count === screens.length - 1) {
      setCount(0);
    } else {
      setCount(count + 1);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <WebView
        source={{
          uri,
        }}
        style={{width: '100%', height: '100%'}}
      />
    </SafeAreaView>
  );
};

export default NotionView;

const styles = StyleSheet.create({});
