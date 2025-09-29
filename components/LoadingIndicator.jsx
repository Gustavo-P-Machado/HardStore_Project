import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

const LoadingIndicator = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color={COLORS.text} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
});

export default LoadingIndicator;