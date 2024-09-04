import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import axios from 'axios';

const AddContactScreen = ({ route, navigation }) => {
  const { token } = route.params;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    navigation.setOptions({ title: 'Novo Contato' });
  }, [navigation]);

  const addContact = async () => {
    try {
      await axios.post('http://192.168.18.227:8000/api/contacts', {
        name,
        phone,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Alert.alert('Sucesso', 'Contato adicionado com sucesso.');
      navigation.goBack(); 
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Ocorreu um erro ao adicionar o contato.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TouchableOpacity style={styles.button} onPress={addContact}>
        <Text style={styles.buttonText}>Adicionar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f0f4f8',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddContactScreen;
