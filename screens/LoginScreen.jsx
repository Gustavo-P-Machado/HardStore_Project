import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { COLORS } from '../constants/colors';
import LoadingIndicator from '../components/LoadingIndicator';

const ERROR_MESSAGE = 'Usuário ou senha incorretos.';

const LoginScreen = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const handleChange = (field, value) => {
    setCredentials((prev) => ({ ...prev, [field]: value }));
    setError(''); // Limpa o erro quando o usuário digitar
  };

  const handleLogin = async () => {
    // Validação básica
    if (!credentials.username.trim() || !credentials.password.trim()) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Busca todos os usuários da API
      const usersResponse = await axios.get('https://fakestoreapi.com/users');
      const users = usersResponse.data;

      // Verifica se existe um usuário com username E password corretos
      const userFound = users.find(
        (user) => 
          user.username === credentials.username && 
          user.password === credentials.password
      );

      if (userFound) {
        // Login bem-sucedido - navega para a próxima tela
        navigation.navigate('ProductDetail');
        
        // Limpa os campos após login bem-sucedido
        setCredentials({ username: '', password: '' });
      } else {
        setError(ERROR_MESSAGE);
      }
    } catch (err) {
      console.error('Erro no login:', err);
      setError('Erro de conexão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>HardStore</Text>

      <TextInput
        style={styles.input}
        placeholder="Usuário"
        placeholderTextColor={COLORS.placeholder}
        value={credentials.username}
        onChangeText={(text) => handleChange('username', text)}
        autoCapitalize="none"
        editable={!loading}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor={COLORS.placeholder}
        value={credentials.password}
        onChangeText={(text) => handleChange('password', text)}
        secureTextEntry
        autoCapitalize="none"
        editable={!loading}
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity 
        onPress={handleLogin} 
        style={[styles.button, loading && styles.buttonDisabled]}
        disabled={loading}
      >
        <LinearGradient
          colors={[COLORS.primaryGradientStart, COLORS.primaryGradientEnd]}
          style={styles.gradient}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Carregando...' : 'Login'}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 25,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 40,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    paddingHorizontal: 15,
    color: COLORS.text,
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  button: {
    width: '100%',
    borderRadius: 50,
    overflow: 'hidden',
    marginTop: 10,
  },
  buttonDisabled: {
    opacity: 0.6,
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
  errorText: {
    color: '#ff6b6b',
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 14,
  },
});

export default LoginScreen;