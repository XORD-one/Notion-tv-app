import React, {useState} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import shuffle from 'lodash.shuffle';
import GalleryItem from './GalleryItem';
import {useFocusEffect} from '@react-navigation/native';

const Gallery = ({rowNumber}) => {
  const [items, setItems] = useState([]);

  useFocusEffect(() => {
    (async () => {
      let data = await fetch(
        'https://raw.githubusercontent.com/n4beel/webview-example/main/SCREENS_DATA.js',
      );
      data = await data.json();
      console.log('data => ', data);
    })();
  });

  return (
    <ScrollView horizontal style={styles.row}>
      {items &&
        items.map((item, i) => (
          <GalleryItem
            key={i}
            title={item.name}
            image={item.image}
            screens={item.screens}
            hasTVPreferredFocus={rowNumber === 0 && i === 0}
            blockFocusRight={i === items.length - 1}
          />
        ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  row: {
    marginBottom: 50,
  },
});

export default Gallery;
