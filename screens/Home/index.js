/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  Dimensions,
  ActivityIndicator,
  Text,
  TouchableHighlight,
  findNodeHandle,
} from 'react-native';
import shuffle from 'lodash.shuffle';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import GalleryItem from '../../components/GalleryItem';

const {height} = Dimensions.get('window');

const App = () => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [screenTime, setScreenTime] = useState(0);
  const [error, setError] = useState('');
  const [retryFocused, setRetryFocused] = useState(false);

  const touchableHighlightRef = useRef(null);
  const onRef = useCallback(ref => {
    if (ref) {
      touchableHighlightRef.current = ref;
    }
  }, []);

  useEffect(() => {
    fetchScreensData();
  }, []);

  const fetchScreensData = async () => {
    try {
      let data = await fetch(
        'https://raw.githubusercontent.com/XORD-one/Notion-tv-app/main/SCREENS_DATA.json',
      );
      data = await data.json();
      setItems(shuffle(data.screens));
      setScreenTime(data.screenTimeInMinutes);
      setError('');
      setLoading(false);
    } catch (error) {
      console.log('error in fetching screens data => ', error);
      setError('Error in fetching screens');
      setLoading(false);
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          {loading && (
            <View style={styles.loadingBody}>
              <ActivityIndicator size="large" />
            </View>
          )}
          {!!error && (
            <View style={styles.loadingBody}>
              <Text style={{fontSize: 20}}>{error}</Text>
              <TouchableHighlight
                style={[
                  {
                    marginTop: 16,
                    paddingVertical: 10,
                    paddingHorizontal: 30,
                    borderRadius: 30,
                  },
                  retryFocused
                    ? styles.retryButtonActive
                    : styles.retryButtonBlur,
                ]}
                ref={onRef}
                onFocus={() => {
                  setRetryFocused(true);
                }}
                onBlur={() => {
                  setRetryFocused(false);
                }}
                onPress={() => {
                  console.log('retrying...');
                  setError('');
                  fetchScreensData();
                }}
                hasTVPreferredFocus={true}
                blockFocusRight={1}>
                <Text
                  style={
                    retryFocused ? styles.retryTextActive : styles.retryTextBlur
                  }>
                  Retry
                </Text>
              </TouchableHighlight>
            </View>
          )}
          {items && (
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
  retryButtonActive: {
    backgroundColor: '#fff',
  },
  retryTextActive: {color: '#000'},
  retryButtonBlur: {
    borderColor: '#fff',
    borderWidth: 2,
  },
  retryTextBlur: {color: '#fff'},
});

export default App;
