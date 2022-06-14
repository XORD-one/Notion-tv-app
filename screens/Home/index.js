/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {useFocusEffect} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import shuffle from 'lodash.shuffle';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import GalleryItem from '../../components/GalleryItem';

const {height} = Dimensions.get('window');

const App = () => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [screenTime, setScreenTime] = useState(0);

  useEffect(() => {
    (async () => {
      let data = await fetch(
        'https://raw.githubusercontent.com/n4beel/webview-example/main/SCREENS_DATA.json',
      );
      data = await data.json();
      setItems(shuffle(data.screens));
      setScreenTime(data.screenTimeInMinutes);
      setLoading(false);
    })();
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          {loading ? (
            <View style={styles.loadingBody}>
              <ActivityIndicator size="large" />
            </View>
          ) : (
            <View style={styles.body}>
              <View style={styles.sectionContainer}>
                <ScrollView horizontal style={styles.row}>
                  {items &&
                    items.map((item, i) => (
                      <GalleryItem
                        key={i}
                        title={item.name}
                        image={item.image}
                        screens={item.screens}
                        screenTime={screenTime}
                        hasTVPreferredFocus={i === 0}
                        blockFocusRight={i === items.length - 1}
                      />
                    ))}
                </ScrollView>
              </View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    flex: 1,
    backgroundColor: Colors.black,
    height,
  },
  loadingBody: {
    flex: 1,
    backgroundColor: Colors.black,
    height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionContainer: {
    marginTop: 32,
    marginLeft: 10,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
