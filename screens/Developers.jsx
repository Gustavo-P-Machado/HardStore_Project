import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const data = [
  {
    id: '1',
    title: 'João Eduardo',
    subtitle: 'RA: 1136483',
    image: 'Link da imagem',
  },
  {
    id: '2',
    title: 'Bernardo Rodrigues',
    subtitle: 'RA: 1136134',
    image: 'link da imagem',
  },
  {
    id: '3',
    title: 'Gustavo Pan Machado',
    subtitle: 'RA: ',
    image: 'link da imagem',
  },
  {
    id: '4',
    title: 'Daniel Borges',
    subtitle: 'RA: 1135956',
    image: 'link da imagem',
  },
];

const Developers = () => {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.subtitle}>{item.subtitle}</Text>
      <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a0c2e',
    justifyContent: 'center',
  },
  card: {
    width: width,
    alignItems: 'center',
    padding: 20,
    paddingTop: 100,
  },
  image: {
    width: width * 0.9,
    height: 250,
    borderRadius: 10,
    marginTop: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#e6e6fa',
    textAlign: 'center',
    marginTop: 5,
  },
});


export default Developers;