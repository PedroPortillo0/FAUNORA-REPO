import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ImageAtom from '../../components/atoms/ImageAtom';

const VeterinarianLoginPage = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  
  const handleValidateEmail = () => {
    navigation.navigate('VeterinarianHome');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Landing')}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <View style={styles.containerImgTop}>
        <ImageAtom 
          source={require('../../../assets/logo1.png')} 
        />
      </View>
      <View style={styles.loginContainer}>
        <Text style={styles.title}>Iniciar sesión como veterinario</Text>
        <Text style={styles.subtitle}>Accede a tu panel de control para gestionar la salud y el bienestar de tus pacientes.</Text>
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
        <TouchableOpacity style={styles.loginButton} onPress={handleValidateEmail}>
          <Text style={styles.loginButtonText}>Iniciar sesión</Text>
        </TouchableOpacity>
        <Text style={styles.linkText}>
          ¿Eres dueño? <Text style={styles.link} onPress={() => navigation.navigate('Login')}>Inicia sesión aquí</Text>
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

export default VeterinarianLoginPage;
