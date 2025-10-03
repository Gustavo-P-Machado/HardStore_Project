import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const LogoutButton = ({ onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.text}>Sair</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    marginLeft: 15,
    padding: 8,
    backgroundColor: '#ff6b6b',
    borderRadius: 20,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default LogoutButton;
