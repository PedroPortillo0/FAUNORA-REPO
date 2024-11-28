import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa AsyncStorage
import ImageAtom from '../../components/atoms/ImageAtom';

const RegisterPage = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [focusedField, setFocusedField] = useState(null);

  const handleRegister = async () => {
    // Asegurarse de que el número telefónico tenga el prefijo +521
    let formattedPhoneNumber = phoneNumber;
    if (!formattedPhoneNumber.startsWith('+521')) {
      formattedPhoneNumber = '+521' + formattedPhoneNumber;
    }

    if (!firstName || !lastName || !email || !formattedPhoneNumber) {
      Alert.alert("Error", "Todos los campos son obligatorios.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Por favor, introduce un correo electrónico válido.");
      return;
    }

    if (formattedPhoneNumber.length < 13) {
      Alert.alert("Error", "El número telefónico debe tener al menos 13 dígitos.");
      return;
    }

    // Preparar datos para la solicitud
    const requestData = {
      firstName,
      lastName,
      email,
      phone: formattedPhoneNumber,
    };

    try {
      const response = await fetch(
        "https://3bl9j75s-3001.usw3.devtunnels.ms/api/v1/users/contacts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        Alert.alert("Éxito", "Registro completado correctamente.");
        console.log("Respuesta del servidor:", responseData);

        // Guardar el id en AsyncStorage después de la respuesta exitosa
        try {
          await AsyncStorage.setItem('contactId', responseData.id); // Guardamos el id en el almacenamiento local
          console.log("ID guardado en AsyncStorage: ", responseData.id); // Muestra el id guardado
        } catch (error) {
          console.error("Error al guardar el id en AsyncStorage:", error);
        }

        // Navegar a otra pantalla si es necesario
        navigation.navigate("ContactPage"); // Cambia 'Home' según sea necesario
      } else {  
        const errorData = await response.json();
        Alert.alert("Error", errorData.message || "Ocurrió un error durante el registro.");
        console.error("Error en el servidor:", errorData);
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo conectar con el servidor. Inténtalo más tarde.");
      console.error("Error de red:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Landing')}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      <View style={styles.containerImgTop}>
        <ImageAtom source={require('../../../assets/logo1.png')} />
      </View>

      <ScrollView contentContainerStyle={styles.loginContainer}>
        <Text style={styles.title}>Regístrate como dueño</Text>
        <Text style={styles.subtitle}>Empieza a gestionar el cuidado de tus animales de manera eficiente.</Text>

        {/* Campo de Nombre */}
        <View style={[styles.inputContainer, focusedField === 'firstName' && styles.inputContainerFocused]}>
          <Ionicons name="person-outline" size={20} color="#A0A0A0" />
          <TextInput 
            placeholder="Nombres" 
            style={styles.input} 
            onChangeText={setFirstName}
            value={firstName}
            onFocus={() => setFocusedField('firstName')}
            onBlur={() => setFocusedField(null)}
          />
        </View>

        {/* Campo de Apellido */}
        <View style={[styles.inputContainer, focusedField === 'lastName' && styles.inputContainerFocused]}>
          <Ionicons name="person-outline" size={20} color="#A0A0A0" />
          <TextInput 
            placeholder="Apellidos" 
            style={styles.input} 
            onChangeText={setLastName}
            value={lastName}
            onFocus={() => setFocusedField('lastName')}
            onBlur={() => setFocusedField(null)}
          />
        </View>

        {/* Campo de Correo Electrónico */}
        <View style={[styles.inputContainer, focusedField === 'email' && styles.inputContainerFocused]}>
          <Ionicons name="mail-outline" size={20} color="#A0A0A0" />
          <TextInput 
            placeholder="Correo electrónico" 
            style={styles.input} 
            keyboardType="email-address"
            onChangeText={setEmail}
            value={email}
            onFocus={() => setFocusedField('email')}
            onBlur={() => setFocusedField(null)}
          />
        </View>

        {/* Campo de Número Telefónico */}
        <View style={[styles.inputContainer, focusedField === 'phoneNumber' && styles.inputContainerFocused]}>
          <Ionicons name="call-outline" size={20} color="#A0A0A0" />
          <TextInput 
            placeholder="Número telefónico" 
            style={styles.input} 
            keyboardType="phone-pad"
            onChangeText={setPhoneNumber}
            value={phoneNumber}
            onFocus={() => setFocusedField('phoneNumber')}
            onBlur={() => setFocusedField(null)}
          />
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
          <Text style={styles.loginButtonText}>Registrar</Text>
        </TouchableOpacity>

        <Text style={styles.linkText}>
          ¿Eres veterinario? <Text style={styles.link} onPress={() => navigation.navigate('VeterinarianRegister')}>Registrate aquí</Text>
        </Text>
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
    paddingTop: 20,
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
    marginTop: 20,
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
  linkText: {
    color: '#707070',
    fontSize: 14,
    marginTop: 5,
    textAlign: 'center',
    marginTop: 25,
  },
  link: {
    color: '#0078FF',
  },
});

export default RegisterPage;
