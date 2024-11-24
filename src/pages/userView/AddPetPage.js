import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Navbar from "../../components/organisms/Navbar";

const PetForm = ({ navigation }) => {
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("Perro");
  const [breed, setBreed] = useState("");
  const [image, setImage] = useState("");
  const [age, setAge] = useState("");
  const [ageUnit, setAgeUnit] = useState("Meses/Años"); // Nuevo estado para la unidad de edad
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("Macho");
  const [height, setHeight] = useState("");
  const [vaccines, setVaccines] = useState("");
  const [allergies, setAllergies] = useState("");
  const [sterilized, setSterilized] = useState("Sí");

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
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
          <TextInput
            style={styles.input}
            value={image}
            onChangeText={setImage}
            placeholder="Ej. https://url.de.imagen.jpg"
          />

          {/* Datos físicos */}
          <View style={styles.divider}></View>
          <Text style={styles.sectionTitle}>Datos físicos</Text>
          <View style={styles.row}>
            <View style={styles.columnD1}>
              <Text style={styles.label}>Edad</Text>
              <TextInput
                style={[styles.input, styles.smallInput]}
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
                placeholder="Ej. 2"
              />
            </View>
            <View style={styles.columnD2}>
              <Text style={styles.label}>Mes/Año</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={ageUnit}
                  style={[styles.picker, styles.smallInput]}
                  onValueChange={(itemValue) => setAgeUnit(itemValue)}
                >
                  <Picker.Item label="Meses" value="Meses" />
                  <Picker.Item label="Años" value="Años" />
                </Picker>
              </View>
            </View>
            <View style={styles.columnD3}>
              <Text style={styles.label}>Peso</Text>
              <View style={styles.inputWithUnit}>
                <TextInput
                  style={[styles.input2, styles.smallInput]}
                  value={weight}
                  onChangeText={setWeight}
                  keyboardType="numeric"
                  placeholder="Ej. 5.2"
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
          <TextInput
            style={styles.input}
            value={vaccines}
            onChangeText={setVaccines}
            placeholder="Ej. Rabia, Parvovirus"
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
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Agregar mascota</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
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
});

export default PetForm;
