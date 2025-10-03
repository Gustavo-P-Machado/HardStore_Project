import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { COLORS } from './constants/colors';

import LoginScreen from './screens/LoginScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import HomeScreen from './screens/HomeScreen';
import Developers from './screens/Developers';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerStyle: { backgroundColor: COLORS.background },
            headerTitleAlign: 'center',
            headerTintColor: '#fff',
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={({ navigation }) => ({
              headerLeft: () => (
                <LogoutButton onPress={() => navigation.replace('Login')} />
              ),
              headerTitle: 'Produtos',
              headerRight: () => (
                <InfoButton onPress={() => navigation.navigate('Developers')} />
              ),
            })}
          />
          <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
          <Stack.Screen name="Developers" component={Developers} options={{ headerTitle: 'Informações do Grupo' }} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="light" backgroundColor={COLORS.background} />
    </SafeAreaProvider>
  );
}