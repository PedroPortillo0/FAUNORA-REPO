import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ImageAtom from '../components/atoms/ImageAtom';

const ChangePasswordPage = ({ navigation }) => {
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  
    const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
      setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
    };

    // Función para manejar la validación y redirección
    const handleChangePassword = () => {
        if (password === '') {
            Alert.alert('Error', 'Por favor, ingrese una contraseña.');
        } else if (confirmPassword === '') {
            Alert.alert('Error', 'Por favor, confirme su contraseña.');
        } else if (password !== confirmPassword) {
            Alert.alert('Error', 'Las contraseñas no coinciden.');
        } else {
            // Aquí puedes agregar la lógica para cambiar la contraseña en tu backend
            Alert.alert('Éxito', 'Contraseña cambiada con éxito.');
            navigation.navigate('Login'); // Redirigir al login
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
                    source={require('../../assets/logo1.png')} 
                />
            </View>

            {/* Contenido del Cambio de Contraseña */}
            <View style={styles.loginContainer}>
                <Text style={styles.title}>Cambiar contraseña</Text>
                <Text style={styles.subtitle}>Ingrese una contraseña segura y que recuerde.</Text>

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

                {/* Campo de Confirmar Contraseña */}
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

                {/* Botón para validar el cambio de contraseña */}
                <TouchableOpacity style={styles.loginButton} onPress={handleChangePassword}>
                    <Text style={styles.loginButtonText}>Cambiar contraseña</Text>
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

export default ChangePasswordPage;
