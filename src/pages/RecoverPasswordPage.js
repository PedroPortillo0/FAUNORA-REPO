import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ImageAtom from '../components/atoms/ImageAtom';

const RecoverPasswordPage = ({ navigation }) => {
  const [emailFocused, setEmailFocused] = useState(false);

  // Función para manejar la redirección
  const handleValidateEmail = () => {
    // Aquí puedes agregar la lógica de validación de correo si es necesario
    navigation.navigate('ChangePassword'); // Cambia 'NextPage' al nombre de la pantalla a la que deseas redirigir
  };

  return (
    <View style={styles.container}>
      {/* Botón de regreso */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Landing')}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      {/* Imagen Superior */}
      <View style={styles.containerImgTop}>
        <ImageAtom 
          source={require('../../assets/logo1.png')} 
        />
      </View>

      {/* Contenido del Login */}
      <View style={styles.loginContainer}>
        <Text style={styles.title}>Recuperar contraseña</Text>
        <Text style={styles.subtitle}>Administra el cuidado de tus animales de forma sencilla.</Text>

        {/* Campo de Correo Electrónico */}
        <View style={[styles.inputContainer, emailFocused && styles.inputContainerFocused]}>
          <Ionicons name="mail-outline" size={20} color="#A0A0A0" />
          <TextInput 
            placeholder="Correo electrónico" 
            style={styles.input} 
            keyboardType="email-address"
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
          />
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleValidateEmail}>
          <Text style={styles.loginButtonText}>Validar correo</Text>
        </TouchableOpacity>
      </View>
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
    flex: 1,
    backgroundColor: 'white',
    borderTopRightRadius: 50,
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
    fontWeight: 'bold',
  },
});

export default RecoverPasswordPage;
