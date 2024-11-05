import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ImageAtom from '../../components/atoms/ImageAtom';

const RegisterPage = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
  const [usernameFocused, setUsernameFocused] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  const handleRegister = () => {
    if (!email || !username || !password || !confirmPassword) {
      Alert.alert("Error", "Todos los campos son obligatorios.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Por favor, introduce un correo electrónico válido.");
      return;
    }

    if (username.length < 3) {
      Alert.alert("Error", "El nombre de usuario debe tener al menos 3 caracteres.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }

    Alert.alert("Éxito", "Te has registrado correctamente.");
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

        <View style={[styles.inputContainer, emailFocused && styles.inputContainerFocused]}>
          <Ionicons name="mail-outline" size={20} color="#A0A0A0" />
          <TextInput 
            placeholder="Correo electrónico" 
            style={styles.input} 
            keyboardType="email-address"
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
            onChangeText={setEmail}
            value={email}
          />
        </View>

        <View style={[styles.inputContainer, usernameFocused && styles.inputContainerFocused]}>
          <Ionicons name="person-outline" size={20} color="#A0A0A0" />
          <TextInput 
            placeholder="Nombre de usuario" 
            style={styles.input} 
            onChangeText={setUsername}
            value={username}
            onFocus={() => setUsernameFocused(true)}
            onBlur={() => setUsernameFocused(false)}
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

        <View style={[styles.inputContainer, confirmPasswordFocused && styles.inputContainerFocused]}>
          <Ionicons name="lock-closed-outline" size={20} color="#A0A0A0" />
          <TextInput 
            placeholder="Confirmar contraseña" 
            style={styles.input} 
            secureTextEntry={!isConfirmPasswordVisible}
            onChangeText={setConfirmPassword}
            value={confirmPassword}
            onFocus={() => setConfirmPasswordFocused(true)}
            onBlur={() => setConfirmPasswordFocused(false)}
          />
          <TouchableOpacity onPress={toggleConfirmPasswordVisibility}>
            <Ionicons 
              name={isConfirmPasswordVisible ? "eye-off-outline" : "eye-outline"} 
              size={20} 
              color="#A0A0A0" 
            />
          </TouchableOpacity>
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
    fontWeight: 'bold',
  },
});

export default RegisterPage;
