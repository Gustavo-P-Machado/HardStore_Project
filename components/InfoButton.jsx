import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const InfoButton = ({ onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.text}>Info</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    marginRight: 15,
    padding: 8,
    backgroundColor: '#0070c0',
    borderRadius: 20,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default InfoButton;
