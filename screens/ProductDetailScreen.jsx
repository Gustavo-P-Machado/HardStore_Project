import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../constants/colors';
import LoadingIndicator from '../components/LoadingIndicator';
import ProductImage from '../components/ProductImage';
import ProductInfo from '../components/ProductInfo';
// import StickyFooterButton from '../components/stickyFooterButton';
import StickyFooterButton from '../components/StickyFooterButton'
import { useRoute } from '@react-navigation/native';

const ProductDetailScreen = () => {
  const route = useRoute();
  const { productId } = route.params;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products/' + productId); //TODO - Depois tem que fazer isso de forma dinâmica
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError('Não foi possível carregar o produto.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);
  
  const handleAddToCart = () => {
    console.log('Produto adicionado ao carrinho:', product.title);
    // TODO - Implementar a lógica de adicionar ao carrinho aqui
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    // Usando edges para evitar o safe area do topo e deixar a cor de fundo preencher a tela inteira
    <SafeAreaView style={styles.container} edges={['left', 'right', 'top']}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {product && (
          <>
            <ProductImage imageUrl={product.image} />
            <ProductInfo
              title={product.title}
              category={product.category}
              description={product.description}
              price={product.price}
            />
          </>
        )}
      </ScrollView>
      <StickyFooterButton onPress={handleAddToCart} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContainer: {
    // Adiciona padding na parte inferior igual à altura do botão + margens
    // para que o conteúdo final não fique escondido atrás do botão
    paddingBottom: 120, 
  },
  errorText: {
    color: COLORS.text,
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
  },
});

export default ProductDetailScreen;