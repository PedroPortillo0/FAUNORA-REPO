import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ImageAtom from '../../components/atoms/ImageAtom';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ContactPage = ({ navigation }) => {
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [focusedField, setFocusedField] = useState(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedId = await AsyncStorage.getItem('contactId');
        if (storedId) {
          setUserId(storedId);
        }
      } catch (error) {
        console.error('Error al obtener el ID del usuario del almacenamiento local:', error);
      }
    };
    fetchUserId();
  }, []);

  const handleRegister = async () => {
    if (!username || !password || !confirmPassword) {
      Alert.alert("Error", "Todos los campos son obligatorios.");
      return;
    }
  
    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }
  
    try {
      const contactId = await AsyncStorage.getItem('contactId');
      console.log('ID inicial (contactId):', contactId);
  
      const requestBody = {
        contactId: contactId,
        username,
        password,
      };
  
      console.log('Datos que se enviarán en el POST:', requestBody);
  
      const response = await fetch('https://3bl9j75s-3001.usw3.devtunnels.ms/api/v1/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
  
      if (response.ok) {
        const responseData = await response.json();
        console.log('Respuesta del servidor:', responseData);
  
        // Guardar el nuevo ID en AsyncStorage
        try {
          await AsyncStorage.setItem('userId', responseData.user.id); // Nota el cambio aquí
          console.log("ID guardado en AsyncStorage:", responseData.user.id);
          setUserId(responseData.user.id); // Actualiza el estado para reflejar el nuevo ID en la interfaz
        } catch (error) {
          console.error("Error al guardar el ID en AsyncStorage:", error);
        }
  
        Alert.alert("Éxito", "Usuario registrado correctamente.");
        navigation.navigate("Landing");
      } else {
        const errorData = await response.json();
        console.error('Error en el POST:', errorData);
        Alert.alert("Error", "No se pudo completar el registro.");
      }
    } catch (error) {
      console.error('Error al realizar el POST:', error);
      Alert.alert("Error", "Ocurrió un problema al intentar registrarse.");
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
        <Text style={styles.title}>Validación de cuenta</Text>
        <Text style={styles.subtitle}>Completa los campos para validar tu cuenta.</Text>

        <View style={[styles.inputContainer, focusedField === 'username' && styles.inputContainerFocused]}>
          <Ionicons name="person-outline" size={20} color="#A0A0A0" />
          <TextInput 
            placeholder="Nombre de usuario" 
            style={styles.input} 
            value={username}
            onChangeText={setUsername}
            onFocus={() => setFocusedField('username')}
            onBlur={() => setFocusedField(null)}
          />
        </View>

        <View style={[styles.inputContainer, focusedField === 'password' && styles.inputContainerFocused]}>
          <Ionicons name="lock-closed-outline" size={20} color="#A0A0A0" />
          <TextInput 
            placeholder="Contraseña" 
            style={styles.input} 
            secureTextEntry={!isPasswordVisible}
            onChangeText={setPassword}
            value={password}
            onFocus={() => setFocusedField('password')}
            onBlur={() => setFocusedField(null)}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Ionicons 
              name={isPasswordVisible ? "eye-off-outline" : "eye-outline"} 
              size={20} 
              color="#A0A0A0" 
            />
          </TouchableOpacity>
        </View>

        <View style={[styles.inputContainer, focusedField === 'confirmPassword' && styles.inputContainerFocused]}>
          <Ionicons name="lock-closed-outline" size={20} color="#A0A0A0" />
          <TextInput 
            placeholder="Confirmar Contraseña" 
            style={styles.input} 
            secureTextEntry={!isPasswordVisible}
            onChangeText={setConfirmPassword}
            value={confirmPassword}
            onFocus={() => setFocusedField('confirmPassword')}
            onBlur={() => setFocusedField(null)}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Ionicons 
              name={isPasswordVisible ? "eye-off-outline" : "eye-outline"} 
              size={20} 
              color="#A0A0A0" 
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
          <Text style={styles.loginButtonText}>Registrar Usuario</Text>
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
  userIdText: {
    fontSize: 16,
    color: '#00B4A7',
    marginTop: 20,
  }
});

export default ContactPage;
