import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Linking, Alert } from 'react-native';
import axios from 'axios';
import { FloatingAction } from 'react-native-floating-action';
import Icon from 'react-native-vector-icons/FontAwesome';

const ContactsScreen = ({ route, navigation }) => {
  const { token } = route.params;

  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    navigation.setOptions({ title: 'Meus Contatos' });
  }, [navigation]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('http://192.168.18.227:8000/api/contacts', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setContacts(response.data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
        Alert.alert("Erro", "Não foi possível carregar os contatos.");
      }
    };
    const unsubscribe = navigation.addListener('focus', () => {
      fetchContacts();
    });

    return unsubscribe;
  }, [navigation, token]);

  const callContact = (phone) => {
    Linking.openURL(`tel:${phone}`).catch(err => {
      console.error("Error opening dialer:", err);
      Alert.alert("Erro", "Não foi possível abrir o discador.");
    });
  };

  const whatsappContact = (phone) => {
    Linking.openURL(`whatsapp://send?phone=${phone}`).catch(err => {
      console.error("Error opening WhatsApp:", err);
      Alert.alert("Erro", "Não foi possível abrir o WhatsApp.");
    });
  };

  const deleteContact = async (id) => {
    try {
      await axios.delete(`http://192.168.18.227:8000/api/contacts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setContacts(contacts.filter(contact => contact.id !== id));
    } catch (error) {
      console.error("Error deleting contact:", error);
      Alert.alert("Erro", "Não foi possível excluir o contato.");
    }
  };

  const confirmDelete = (id) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Você tem certeza de que deseja excluir este contato?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          onPress: () => deleteContact(id),
        },
      ],
      { cancelable: false }
    );
  };

  const renderContactItem = ({ item }) => (
    <View style={styles.contactItem}>
      <Text style={styles.contactName}>{item.name}</Text>
      <View style={styles.actionContainer}>
        <TouchableOpacity onPress={() => callContact(item.phone)} style={styles.actionButton}>
          <Icon name="phone" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => whatsappContact(item.phone)} style={styles.actionButton}>
          <Icon name="whatsapp" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => confirmDelete(item.id)} style={styles.actionButton}>
          <Icon name="trash" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const actions = [
    {
      text: 'Adicionar Contato',
      icon: <Icon name="plus" size={20} color="#fff" />,
      name: 'add_contact',
      position: 1,
      color: '#007bff',
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderContactItem}
      />
      <FloatingAction
        actions={actions}
        overrideWithAction={true}
        onPressItem={(name) => {
          navigation.navigate('AddContactScreen', { token });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  contactItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  contactName: {
    fontSize: 18,
    fontWeight: '500',
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    marginLeft: 15,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
});

export default ContactsScreen;
