import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { formatCurrency } from '../utils/formatCurrency';

const categories = [
  'electronics'
];

export default function HomeScreen() {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  const fetchProducts = async () => {
    setLoading(true);
    let url = 'https://fakestoreapi.com/products';
    if (selectedCategory) {
      url = `https://fakestoreapi.com/products/category/${selectedCategory}`;
    }
    try {
      const response = await fetch(url);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      setProducts([]);
    }
    setLoading(false);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleClearFilter = () => {
    setSelectedCategory('');
  };

  const renderProduct = ({ item }) => (
    <View style={styles.productContainer}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text style={styles.productTitle}>{item.title}</Text>
      <Text style={styles.productPrice}>{formatCurrency(item.price)}</Text>
    </View>
  );

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
          <Text style={styles.clearText}>Limpar Filtro</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#000" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderProduct}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterButton: {
    backgroundColor: '#eee',
    padding: 8,
    borderRadius: 20,
    margin: 4,
  },
  selectedFilter: {
    backgroundColor: '#cce5ff',
  },
  filterText: {
    fontSize: 14,
    color: '#333',
  },
  clearButton: {
    backgroundColor: '#ffdddd',
    padding: 8,
    borderRadius: 20,
    margin: 4,
  },
  clearText: {
    fontSize: 14,
    color: '#d00',
  },
  productContainer: {
    backgroundColor: '#fafafa',
    borderRadius: 10,
    padding: 12,
    marginVertical: 6,
    alignItems: 'center',
    elevation: 2,
  },
  productImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 15,
    color: '#0070c0',
    fontWeight: 'bold',
  },
});
