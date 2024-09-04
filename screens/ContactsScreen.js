import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Linking } from 'react-native';
import axios from 'axios';

const ContactsScreen = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('http://192.168.90.69:8000/api/contacts');
        setContacts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchContacts();
  }, []);

  const callContact = (phone) => {
    Linking.openURL(`tel:${phone}`);
  };

  const whatsappContact = (phone) => {
    Linking.openURL(`whatsapp://send?phone=${phone}`);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.contactItem}>
            <Text>{item.name}</Text>
            <Button title="Ligar" onPress={() => callContact(item.phone)} />
            <Button title="WhatsApp" onPress={() => whatsappContact(item.phone)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  contactItem: {
    marginBottom: 16,
  },
});

export default ContactsScreen;
