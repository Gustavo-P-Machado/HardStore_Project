import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../constants/colors';

const StickyFooterButton = ({ onPress }) => {
  // Hook para pegar a distância da área segura na parte inferior
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom || 10 }]}>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <LinearGradient
          colors={[COLORS.primaryGradientStart, COLORS.primaryGradientEnd]}
          style={styles.gradient}
        >
          <Text style={styles.buttonText}>Adicionar ao Carrinho</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: COLORS.background, // Fundo para cobrir o conteúdo que passa por baixo
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  button: {
    borderRadius: 50,
    overflow: 'hidden',
    width: '100%',
  },
  gradient: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default StickyFooterButton;