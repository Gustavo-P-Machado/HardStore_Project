import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const ProductImage = ({ imageUrl }) => (
  <View style={styles.container}>
    <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="contain" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  image: {
    width: '90%',
    aspectRatio: 1,
  },
});

export default ProductImage;
