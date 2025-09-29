import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ProductDetailScreen from './screens/ProductDetailScreen';
import { COLORS } from './constants/colors';

export default function App() {
  return (
    <SafeAreaProvider>
      <ProductDetailScreen />
      <StatusBar style="light" backgroundColor={COLORS.background} />
    </SafeAreaProvider>
  );
}