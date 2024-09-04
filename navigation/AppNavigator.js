import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import ContactsScreen from '../screens/ContactsScreen';
import RegisterScreen from '../screens/RegisterScreen'; 
import AddContactScreen from '../screens/AddContactScreen'; // Importar a tela de adicionar contato

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Contacts" component={ContactsScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="AddContactScreen" component={AddContactScreen} /> 

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
