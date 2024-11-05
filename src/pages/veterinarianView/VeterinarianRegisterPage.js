import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ImageAtom from '../../components/atoms/ImageAtom';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

const RegisterPage = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [mapVisible, setMapVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  const handleRegister = () => {
    if (!email || !username || !password || !confirmPassword || !latitude || !longitude || !imageUri) {
      Alert.alert("Error", "Todos los campos son obligatorios.");
      return;
    }
    Alert.alert("Éxito", "Te has registrado correctamente.");
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Error", "Permisos de galería denegados.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const openMap = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Error", "Permisos de ubicación denegados.");
      return;
    }
    const location = await Location.getCurrentPositionAsync({});
    setLatitude(location.coords.latitude);
    setLongitude(location.coords.longitude);

    const reverseGeocode = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });

    if (reverseGeocode.length > 0) {
      const { street, city, region, postalCode } = reverseGeocode[0];
      setAddress(`${street}, ${city}, ${region}, ${postalCode}`);
    }

    setMapVisible(true);
  };

  const handleMapPress = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setLatitude(latitude);
    setLongitude(longitude);

    Location.reverseGeocodeAsync({ latitude, longitude })
      .then((reverseGeocode) => {
        if (reverseGeocode.length > 0) {
          const { street, city, region, postalCode } = reverseGeocode[0];
          setAddress(`${street}, ${city}, ${region}, ${postalCode}`);
        }
      })
      .catch(() => Alert.alert("Error", "No se pudo obtener la dirección"));

    setMapVisible(false);
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
        <Text style={styles.title}>Regístrate como veterinario</Text>
        <Text style={styles.subtitle}>Únete a nuestra comunidad y mejora el cuidado de tus pacientes.</Text>

        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="#A0A0A0" />
          <TextInput 
            placeholder="Correo electrónico" 
            style={styles.input} 
            keyboardType="email-address"
            onChangeText={setEmail}
            value={email}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={20} color="#A0A0A0" />
          <TextInput 
            placeholder="Nombre de usuario" 
            style={styles.input} 
            onChangeText={setUsername}
            value={username}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#A0A0A0" />
          <TextInput 
            placeholder="Contraseña" 
            style={styles.input} 
            secureTextEntry={!isPasswordVisible}
            onChangeText={setPassword}
            value={password}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Ionicons 
              name={isPasswordVisible ? "eye-off-outline" : "eye-outline"} 
              size={20} 
              color="#A0A0A0" 
            />
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#A0A0A0" />
          <TextInput 
            placeholder="Confirmar contraseña" 
            style={styles.input} 
            secureTextEntry={!isConfirmPasswordVisible}
            onChangeText={setConfirmPassword}
            value={confirmPassword}
          />
          <TouchableOpacity onPress={toggleConfirmPasswordVisibility}>
            <Ionicons 
              name={isConfirmPasswordVisible ? "eye-off-outline" : "eye-outline"} 
              size={20} 
              color="#A0A0A0" 
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.locationButton} onPress={openMap}>
          <Ionicons name="location-outline" size={20} color="#A0A0A0" />
          <Text style={styles.locationButtonText}>Seleccionar ubicación</Text>
        </TouchableOpacity>
        {address ? (
          <Text style={styles.coordinates}>Dirección: {address}</Text>
        ) : null}

        <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
          <Ionicons name="image-outline" size={20} color="#A0A0A0" />
          <Text style={styles.imagePickerText}>Seleccionar imagen</Text>
        </TouchableOpacity>
        {imageUri && (
          <Image source={{ uri: imageUri }} style={styles.imagePreview} />
        )}

        <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
          <Text style={styles.loginButtonText}>Registrar</Text>
        </TouchableOpacity>
      </ScrollView>

      {mapVisible && (
        <MapView
          style={StyleSheet.absoluteFillObject}
          initialRegion={{
            latitude: latitude || 37.78825,
            longitude: longitude || -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onPress={handleMapPress}
        >
          {latitude && longitude && <Marker coordinate={{ latitude, longitude }} />}
        </MapView>
      )}
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
  imagePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#A0A0A0',
    borderRadius: 5,
    marginVertical: 20,
    width: '100%',
  },
  imagePickerText: {
    marginLeft: 10,
    color: '#707070',
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginVertical: 10,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#A0A0A0',
    borderRadius: 5,
    marginVertical: 20,
    width: '100%',
  },
  locationButtonText: {
    marginLeft: 10,
    color: '#707070',
  },
  coordinates: {
    fontSize: 14,
    color: '#333',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default RegisterPage;
