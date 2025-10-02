import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../constants/colors';




const formatPriceBRL = (price) => {
  return price
    ? price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    : '';
};

const categories = [
  'electronics',
  'jewelery',
  "men's clothing",
  "women's clothing"
];


const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  const fetchProducts = async () => {
    setLoading(true);
    setError('');
    let url = 'https://fakestoreapi.com/products';
    if (selectedCategory) {
      url = `https://fakestoreapi.com/products/category/${selectedCategory}`;
    }
    try {
      const response = await fetch(url);
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError('Erro ao carregar produtos.');
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleClearFilter = () => {
    setSelectedCategory('');
  };

  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={handleLogout} style={{ marginLeft: 15 }}>
          <Text style={{ color: COLORS.text }}>Logout</Text>
        </TouchableOpacity>
      ),
      headerTitle: () => (
        <Text style={{ color: COLORS.text, fontWeight: 'bold', fontSize: 20 }}>Produtos</Text>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Developers')} style={{ marginRight: 15 }}>
          <Text style={{ color: COLORS.text }}>Informações</Text>
        </TouchableOpacity>
      ),
      headerStyle: {
        backgroundColor: COLORS.background,
      },
    });
  }, [navigation]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.text} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: 'red' }}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.filterButton, selectedCategory === cat && styles.selectedFilter]}
            onPress={() => handleCategorySelect(cat)}
          >
            <Text style={styles.filterText}>{cat}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.clearButton} onPress={handleClearFilter}>
          <Text style={styles.filterText}>Limpar Filtro</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.productTitle}>{item.title}</Text>
            <Text style={styles.productPrice}>{formatPriceBRL(item.price)}</Text>
            <TouchableOpacity
              style={styles.cartButton}
              onPress={() => handleAddToCart(item)}
            >
              <Text style={styles.cartButtonText}>Adicionar ao Carrinho</Text>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
      {/* Exibe quantidade de itens no carrinho */}
      <View style={styles.cartInfo}>
        <Text style={{ color: COLORS.text }}>
          Itens no carrinho: {cart.length}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 10,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  filterButton: {
    backgroundColor: COLORS.primaryGradientStart,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    margin: 5,
  },
  selectedFilter: {
    backgroundColor: COLORS.primaryGradientEnd,
  },
  clearButton: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    margin: 5,
  },
  filterText: {
    color: COLORS.text,
    fontWeight: 'bold',
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    margin: 10,
    alignItems: 'center',
  },
  productImage: {
    width: 120,
    height: 120,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#eee',
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    color: COLORS.primaryGradientStart,
    fontWeight: 'bold',
  },
  cartButton: {
    marginTop: 10,
    backgroundColor: COLORS.primaryGradientStart,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  cartButtonText: {
    color: COLORS.text,
    fontWeight: 'bold',
    fontSize: 16,
  },
  cartInfo: {
    position: 'absolute',
    bottom: 10,
    right: 20,
    backgroundColor: COLORS.primaryGradientEnd,
    padding: 8,
    borderRadius: 12,
  },
});

export default HomeScreen;
