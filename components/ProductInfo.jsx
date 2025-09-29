import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

const ProductInfo = ({ title, category, description, price }) => {
  const formattedPrice = price
    ? price.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      })
    : '';

  return (
    <View style={styles.container}>
      <Text style={styles.category}>{category}</Text>
      <View style={styles.separator} />
      <Text style={styles.title}>{title}</Text>
      <View style={styles.separator} />
      <View style={styles.priceRow}>
        <Text style={styles.price}>{formattedPrice}</Text>
      </View>
      <View style={styles.separator} />
      <Text style={styles.descriptionLabel}>Descrição</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    marginTop: 35, // Mais espaço no topo
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.primaryGradientStart || '#ccc',
    opacity: 0.2,
    marginVertical: 18, // Mais espaço entre os blocos
    borderRadius: 1,
  },
  category: {
    color: COLORS.textSecondary,
    fontSize: 20,
    textTransform: 'capitalize',
    marginBottom: 0,
    opacity: 0.8,
    letterSpacing: 0.5,
  },
  title: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: 'bold',
    lineHeight: 38,
    marginBottom: 0,
    letterSpacing: 0.5,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 0,
  },
  price: {
    color: COLORS.text,
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'right',
    letterSpacing: 0.5,
  },
  descriptionLabel: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 0,
    letterSpacing: 0.5,
  },
  description: {
    color: COLORS.textSecondary,
    fontSize: 17,
    lineHeight: 28,
    marginBottom: 10,
    letterSpacing: 0.2,
  },
});

export default ProductInfo;