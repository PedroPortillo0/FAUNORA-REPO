import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ImageAtom from '../../components/atoms/ImageAtom';
import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginPage = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [hasLoggedInBefore, setHasLoggedInBefore] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedIn = await AsyncStorage.getItem('hasLoggedIn');
      setHasLoggedInBefore(loggedIn === 'true');
    };
    checkLoginStatus();
  }, []);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleLogin = async () => {
    await AsyncStorage.setItem('hasLoggedIn', 'true');
    setHasLoggedInBefore(true);
  };

  const handleBiometricAuth = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (hasHardware && isEnrolled) {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Escanea tu huella para iniciar sesión',
      });
      if (result.success) {
        alert('Autenticación exitosa');
        navigation.navigate('HomePage');// Redirigir al usuario o manejar el inicio de sesión exitoso
      } else {
        alert('Autenticación fallida');
      }
    } else {
      alert('El dispositivo no admite autenticación biométrica');
    }
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
          source={require('../../../assets/logo1.png')} 
        />
      </View>

      {/* Contenido del Login */}
      <View style={styles.loginContainer}>
        <Text style={styles.title}>Iniciar sesión como dueño</Text>
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

        {/* Campo de Contraseña */}
        <View style={[styles.inputContainer, passwordFocused && styles.inputContainerFocused]}>
          <Ionicons name="lock-closed-outline" size={20} color="#A0A0A0" />
          <TextInput 
            placeholder="Contraseña" 
            style={styles.input} 
            secureTextEntry={!isPasswordVisible}
            onChangeText={setPassword}
            value={password}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Ionicons 
              name={isPasswordVisible ? "eye-off-outline" : "eye-outline"} 
              size={20} 
              color="#A0A0A0" 
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Iniciar sesión</Text>
        </TouchableOpacity>

        {hasLoggedInBefore && (
          <TouchableOpacity style={styles.biometricButton} onPress={handleBiometricAuth}>
            <Ionicons name="finger-print-outline" size={24} color="#00B4A7" />
            <Text style={styles.biometricButtonText}>Iniciar sesión con huella dactilar</Text>
          </TouchableOpacity>
        )}

        <Text style={styles.linkText}>
          ¿Eres veterinario? <Text style={styles.link} onPress={() => navigation.navigate('VeterinarianLogin')}>Inicia sesión aquí</Text>
        </Text>
        <Text style={styles.linkText}>
          Recupera su contraseña <Text style={styles.link} onPress={() => navigation.navigate('RecoverPassword')}>aquí</Text>
        </Text>
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
  biometricButton: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
    justifyContent: 'center',
  },
  biometricButtonText: {
    color: '#00B4A7',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  linkText: {
    color: '#707070',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 25,
  },
  link: {
    color: '#0078FF',
    fontWeight: 'bold',
  },
});

export default LoginPage;
