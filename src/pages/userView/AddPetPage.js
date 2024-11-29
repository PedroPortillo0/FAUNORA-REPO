import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  LogBox,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from '@react-native-community/datetimepicker';
import Navbar from "../../components/organisms/Navbar";
import * as ImagePicker from 'expo-image-picker';
import MultiSelect from 'react-native-multiple-select';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PetForm = ({ navigation }) => {
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("Perro");
  const [breed, setBreed] = useState("");
  const [image, setImage] = useState(null);
  const [age, setAge] = useState("");
  const [ageUnit, setAgeUnit] = useState("Meses/Años"); // Nuevo estado para la unidad de edad
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("Macho");
  const [imageUri, setImageUri] = useState(null);
  const [height, setHeight] = useState("");
  const [allergies, setAllergies] = useState("");
  const [sterilized, setSterilized] = useState("Sí");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [vaccines, setVaccines] = useState([]); 

  const showDatePickerHandler = () => {
    setShowDatePicker(true);
  };

  LogBox.ignoreLogs([
    'VirtualizedLists should never be nested inside plain ScrollViews',
  ]);
  
  const vaccineOptions = [
    { id: '1', name: 'Rabia' },
    { id: '2', name: 'Parvovirus' },
    { id: '3', name: 'Moquillo' },
    { id: '4', name: 'Hepatitis' },
    { id: '5', name: 'Leptospirosis' },
  ];  

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Error", "Permisos de galería denegados.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [5, 5],
      quality: 1,
    });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };  
  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const handleAddPet = async () => {
    const userId = await AsyncStorage.getItem('userId');
    console.log('userId:', userId);
    if (!userId) {
      Alert.alert("Error", "No se pudo obtener el ID del usuario.");
      return;
    }
  
    // Obtener los nombres de las vacunas seleccionadas
    const selectedVaccinesNames = vaccines
      .map(vaccineId => {
        const vaccine = vaccineOptions.find(option => option.id === vaccineId);
        return vaccine ? vaccine.name : null;
      })
      .filter(name => name !== null); // Filtra los valores nulos (si no se encontró un nombre)
  
    // Transformar 'sterilized' a un valor booleano (true/false)
    const sterilizedBool = sterilized === "Sí"; // Si "Sí" selecciona true, si "No" selecciona false
  
    // Mostrar los datos en la consola antes de enviarlos
    console.log('Datos de la mascota:', {
      imageUri,
      name,
      species,
      breed,
      birth_date: date.toISOString().split('T')[0],
      weight,
      height,
      gender,
      vaccines: selectedVaccinesNames,
      allergies,
      sterilized: sterilizedBool,  // Se manda como true o false
    });
  
    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      name: 'pet_image.jpg',
      type: 'image/jpeg',
    });
    formData.append('name', name);
    formData.append('species', species);
    formData.append('breed', breed);
    formData.append('birth_date', date.toISOString().split('T')[0]);
    formData.append('weight', weight);
    formData.append('height', height);
    formData.append('gender', gender);
    formData.append('vaccines', selectedVaccinesNames.join(', '));  // Ahora envía los nombres de las vacunas
    formData.append('allergies', allergies);
    formData.append('sterilized', sterilizedBool);  // Manda true o false
  
    try {
      const response = await fetch(`https://3bl9j75s-3001.usw3.devtunnels.ms/api/v3/pets/users/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });
  
      if (response.ok) {
        Alert.alert("Éxito", "Mascota agregada correctamente.");
        navigation.navigate("HomePage");
      } else {
        const errorData = await response.json();
        Alert.alert("Error", errorData.message || "Ocurrió un error al agregar la mascota.");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo conectar con el servidor. Inténtalo más tarde.");
      console.error("Error de red:", error);
    }
  };
  

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("HomePage")}
      >
        <MaterialCommunityIcons name="arrow-left" size={24} color="black" />
      </TouchableOpacity>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsHorizontalScrollIndicator={false} // Oculta la barra de desplazamiento horizontal
        showsVerticalScrollIndicator={false} // Oculta la barra de desplazamiento vertical
      >
        <View style={styles.container}>
          {/* Información de la mascota */}
          <Text style={styles.sectionTitle}>Información de la mascota</Text>

          <View style={styles.inputContainer}>
            <MaterialCommunityIcons
              name="dog"
              size={20}
              color="#f29d38"
              style={styles.icon}
            />
            <Text style={styles.label}>Nombre de la mascota</Text>
          </View>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Ej. Firulais"
          />

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Especie</Text>
          </View>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={species}
              style={styles.picker}
              onValueChange={(itemValue) => setSpecies(itemValue)}
            >
              <Picker.Item label="Perro" value="Perro" />
              <Picker.Item label="Gato" value="Gato" />
              <Picker.Item label="Ave" value="Ave" />
            </Picker>
          </View>

          <View style={styles.inputContainer}>
            <MaterialCommunityIcons
              name="paw"
              size={20}
              color="#ffad9d"
              style={styles.icon}
            />
            <Text style={styles.label}>Especifica la raza de tu mascota</Text>
          </View>
          <TextInput
            style={styles.input}
            value={breed}
            onChangeText={setBreed}
            placeholder="Ej. Pastor Alemán"
          />

          <View style={styles.inputContainer}>
            <MaterialCommunityIcons
              name="cloud-download-outline"
              size={20}
              color="#00B4A7"
              style={styles.icon}
            />
            <Text style={styles.label}>Carga la imagen de tu mascota</Text>
          </View>
          <TouchableOpacity
            style={styles.imagePicker}
            value={image}
            onPress={pickImage}
            placeholder="Ej. Pastor Alemán"
          >
            <Text style={styles.imagePickerText}>Seleccionar imagen</Text>
          </TouchableOpacity>
          {imageUri && (
            <Image source={{ uri: imageUri }} style={styles.imagePreview} />
          )}

          {/* Datos físicos */}
          <View style={styles.divider}></View>
          <Text style={styles.sectionTitle}>Datos físicos</Text>
          <View style={styles.row}>
            <View style={styles.column2}>
              <Text style={styles.label}>Fecha de nacimiento</Text>
              <TouchableOpacity onPress={showDatePickerHandler}>
                <View style={styles.inputWithUnit}>
                  <Text style={styles.inputText}>{date.toDateString()}</Text>
                </View>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="default"
                  onChange={onDateChange}
                />
              )}
            </View>
            <View style={styles.column2}>
              <Text style={styles.label}>Peso</Text>
              <View style={styles.inputWithUnit}>
                <TextInput
                  style={[styles.input2, styles.smallInput]}
                  value={weight}
                  onChangeText={setWeight}
                  keyboardType="numeric"
                  placeholder="Ej. 12"
                />
                <Text style={styles.unitText}>kg</Text>
              </View>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.column2}>
              <Text style={styles.label}>Sexo</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={gender}
                  style={[styles.picker, styles.smallInput]}
                  onValueChange={(itemValue) => setGender(itemValue)}
                >
                  <Picker.Item label="Macho" value="Macho" />
                  <Picker.Item label="Hembra" value="Hembra" />
                </Picker>
              </View>
            </View>
            <View style={styles.column2}>
              <Text style={styles.label}>Estatura</Text>
              <View style={styles.inputWithUnit}>
                <TextInput
                  style={[styles.input2, styles.smallInput]}
                  value={height}
                  onChangeText={setHeight}
                  keyboardType="numeric"
                  placeholder="Ej. 45"
                />
                <Text style={styles.unitText}>cm</Text>
              </View>
            </View>
          </View>

          {/* Información adicional */}
          <View style={styles.divider}></View>
          <Text style={styles.sectionTitle}>Información adicional</Text>

          <View style={styles.inputContainer}>
            <MaterialCommunityIcons
              name="needle"
              size={20}
              color="#2596be"
              style={styles.icon}
            />
            <Text style={styles.label}>Vacunas que ha recibido la mascota</Text>
          </View>
          <MultiSelect
            items={vaccineOptions}
            uniqueKey="id"
            onSelectedItemsChange={(selectedItems) => setVaccines(selectedItems)}
            selectedItems={vaccines}
            selectText="Selecciona vacunas"
            searchInputPlaceholderText="Busca vacunas..."
            tagRemoveIconColor="#CCC"
            tagBorderColor="#CCC"
            tagTextColor="#333"
            selectedItemTextColor="#ff0000"
            selectedItemIconColor="#ff0000"
            itemTextColor="#000"
            displayKey="name"
            searchInputStyle={{ color: "#000" }}
            submitButtonText="Aceptar"
            styleDropdownMenuSubsection={{
              paddingHorizontal: 10,
              borderWidth: 1,
              borderColor: "#ddd",
              borderRadius: 8,
              backgroundColor: "white",
              height: 40,
              justifyContent: "center",
            }}
            styleInputGroup={{
              borderWidth: 1,
              borderColor: "#ddd",
              borderRadius: 8,
              backgroundColor: "white",
              paddingHorizontal: 10,
              paddingVertical: 8,
              marginVertical: 5,
            }}
            styleDropdownMenu={{
              borderWidth: 1,
              borderColor: "#ddd",
              borderRadius: 8,
              backgroundColor: "white",
            }}
            styleItemsContainer={{
              borderWidth: 1,
              borderColor: "#ddd",
              borderRadius: 8,
              backgroundColor: "white",
            }}
            styleSelectorContainer={{
              paddingLeft: 10, // Añade padding izquierdo
            }}
          />

          <View style={styles.inputContainer}>
            <MaterialCommunityIcons
              name="heart-pulse"
              size={20}
              color="#de1f21"
              style={styles.icon}
            />
            <Text style={styles.label}>Condiciones de salud o alergias</Text>
          </View>
          <TextInput
            style={styles.input}
            value={allergies}
            onChangeText={setAllergies}
            placeholder="Ej. No tiene alergias"
          />

          <Text style={styles.label}>¿Está esterilizado?</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={sterilized}
              style={styles.picker}
              onValueChange={(itemValue) => setSterilized(itemValue)}
            >
              <Picker.Item label="Sí" value="Sí" />
              <Picker.Item label="No" value="No" />
            </Picker>
          </View>

          {/* Botón para agendar */}
          <TouchableOpacity style={styles.button} onPress={handleAddPet}>
            <Text style={styles.buttonText}>Agregar mascota</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Navbar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 20,
    paddingTop: 45,
    width: "100%",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingRight: 0, // Sin padding derecho para evitar más espacio extra
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 10,
    zIndex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#333",
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginTop: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginVertical: 5,
    backgroundColor: "white",
    flex: 1,
  },
  input2: {
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginVertical: 5,
    backgroundColor: "transparent",
    flex: 1,
  },
  inputWithUnit: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginVertical: 5,
    backgroundColor: "white",
    height: 40,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginVertical: 5,
    backgroundColor: "white",
    alignItems: "center", // Alinea horizontalmente el contenido
    justifyContent: "center", // Alinea verticalmente el contenido
    paddingHorizontal: 10,
    width: "100%",
  },
  picker: {
    height: 40,
    width: "100%",
  },
  pickerSexo: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "white",
    marginVertical: 5,
    width: "100%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  column: {
    width: "30%",
  },
  columnD1: {
    width: "15%",
  },
  columnD2: {
    width: "45%",
  },
  columnD3: {
    width: "35%",
  },
  column2: {
    width: "47%",
  },
  smallInput: {
    width: "100%",
    height: 40,
  },
  unitText: {
    fontSize: 14,
    color: "#333",
    marginLeft: 5,
  },
  button: {
    backgroundColor: "#009688",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 30,
    marginBottom: 100,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  divider: {
    height: 1.5,
    backgroundColor: "#000", // Color de la línea divisoria
    marginVertical: 10, // Espaciado antes y después de la línea
  },
  inputWithUnit: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginVertical: 5,
    backgroundColor: 'white',
    height: 40,
  },
  inputText: {
    fontSize: 16,
    color: "#333",
  },
  imagePicker: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginVertical: 5,
    backgroundColor: "white",
    height: 40,
    flex: 1,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginVertical: 10,
  },
  imagePickerText: {
    color: '#707070',
  },
  selectedVaccinesContainer: {
    marginTop: 10,
    paddingHorizontal: 15,
  },
  selectedVaccinesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  selectedVaccineText: {
    fontSize: 14,
    color: '#555',
  },
  
});

export default PetForm;
