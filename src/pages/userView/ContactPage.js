import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ImageAtom from '../../components/atoms/ImageAtom';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa AsyncStorage

const ContactPage = ({ navigation }) => {
  const [contactId, setContactId] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [focusedField, setFocusedField] = useState(null);

  useEffect(() => {
    const fetchContactId = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem('userEmail');
        if (storedEmail) {
          const response = await fetch('https://3bl9j75s-3001.usw3.devtunnels.ms/api/v1/users/contacts');
          const data = await response.json();
          const contact = data.find(contact => contact.email === storedEmail);
          if (contact) {
            setContactId(contact.id);
            setUsername(contact.email);
          }
        }
      } catch (error) {
        console.error('Error al obtener el id de contacto:', error);
      }
    };
    fetchContactId();
  }, []);

  const handlePasswordChange = async () => {
    if (!password || !confirmPassword) {
      Alert.alert("Error", "Ambos campos de contraseña son obligatorios.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }

    try {
      const response = await fetch(`https://3bl9j75s-3001.usw3.devtunnels.ms/api/v1/users/contacts/${contactId}/password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        Alert.alert("Éxito", "Contraseña actualizada correctamente.");
      } else {
        Alert.alert("Error", "Ocurrió un error al actualizar la contraseña.");
      }
    } catch (error) {
      console.error('Error al actualizar la contraseña:', error);
      Alert.alert("Error", "No se pudo actualizar la contraseña. Inténtalo más tarde.");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      <View style={styles.containerImgTop}>
        <ImageAtom source={require('../../../assets/logo1.png')} />
      </View>

      <ScrollView contentContainerStyle={styles.loginContainer}>
        <Text style={styles.title}>Actualizar Contraseña</Text>
        <Text style={styles.subtitle}>Actualiza tu contraseña de manera segura.</Text>

        {/* Campo de Usuario */}
        <View style={[styles.inputContainer, focusedField === 'username' && styles.inputContainerFocused]}>
          <Ionicons name="person-outline" size={20} color="#A0A0A0" />
          <TextInput 
            placeholder="Usuario" 
            style={styles.input} 
            value={username}
            editable={false} // El usuario no puede editar el nombre
          />
        </View>

        {/* Campo de Contraseña */}
        <View style={[styles.inputContainer, focusedField === 'password' && styles.inputContainerFocused]}>
          <Ionicons name="lock-closed-outline" size={20} color="#A0A0A0" />
          <TextInput 
            placeholder="Nueva Contraseña" 
            style={styles.input} 
            secureTextEntry
            onChangeText={setPassword}
            value={password}
            onFocus={() => setFocusedField('password')}
            onBlur={() => setFocusedField(null)}
          />
        </View>

        {/* Confirmar Contraseña */}
        <View style={[styles.inputContainer, focusedField === 'confirmPassword' && styles.inputContainerFocused]}>
          <Ionicons name="lock-closed-outline" size={20} color="#A0A0A0" />
          <TextInput 
            placeholder="Confirmar Contraseña" 
            style={styles.input} 
            secureTextEntry
            onChangeText={setConfirmPassword}
            value={confirmPassword}
            onFocus={() => setFocusedField('confirmPassword')}
            onBlur={() => setFocusedField(null)}
          />
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handlePasswordChange}>
          <Text style={styles.loginButtonText}>Actualizar Contraseña</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#31B3A9',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  containerImgTop: {
    width: '100%',
    height: '30%',
    alignItems: 'center',
    paddingTop: 30,
  },
  loginContainer: {
    flexGrow: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 50,
    padding: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#00B4A7',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#707070',
    textAlign: 'center',
    marginVertical: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 25,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 10,
    width: '100%',
  },
  inputContainerFocused: {
    borderColor: '#00B4A7',
    borderWidth: 1,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    color: '#000',
  },
  loginButton: {
    backgroundColor: '#00B4A7',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    marginTop: 25,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ContactPage;
