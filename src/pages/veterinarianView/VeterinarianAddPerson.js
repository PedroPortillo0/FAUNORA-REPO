import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const VeterinarianAddPerson = ({ navigation }) => {
  const [ownerName, setOwnerName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const [ownerId, setOwnerId] = useState("");

  const handleRegister = () => {
    navigation.navigate('VeterinarianHome');
  };

  return (
    <View style={styles.container}>
      {/* Flecha para volver */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <MaterialCommunityIcons name="arrow-left" size={30} color="#333" />
      </TouchableOpacity>

      {/* Título */}
      <Text style={styles.sectionTitle}>Información del dueño</Text>

      {/* Nombre del dueño */}
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons
          name="account"
          size={20}
          color="#0078FF"
          style={styles.icon}
        />
        <Text style={styles.label}>Nombre del dueño</Text>
      </View>
      <TextInput
        style={styles.input}
        value={ownerName}
        onChangeText={setOwnerName}
        placeholder="Ej. Juan Pérez"
      />

      {/* Correo del dueño */}
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons
          name="email"
          size={20}
          color="#DC4638"
          style={styles.icon}
        />
        <Text style={styles.label}>Correo del dueño</Text>
      </View>
      <TextInput
        style={styles.input}
        value={ownerEmail}
        onChangeText={setOwnerEmail}
        placeholder="Ej. juan.perez@email.com"
        keyboardType="email-address"
      />

      {/* Número telefónico del dueño */}
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons
          name="phone"
          size={20}
          color="#4caf50"
          style={styles.icon}
        />
        <Text style={styles.label}>Número telefónico del dueño</Text>
      </View>
      <TextInput
        style={styles.input}
        value={ownerPhone}
        onChangeText={setOwnerPhone}
        placeholder="Ej. 96175456547"
        keyboardType="phone-pad"
      />

      {/* Identificador del dueño */}
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons
          name="card-account-details"
          size={20}
          color="#0078FF"
          style={styles.icon}
        />
        <Text style={styles.label}>Identificador del dueño</Text>
      </View>
      <TextInput
        style={styles.input}
        value={ownerId}
        onChangeText={setOwnerId}
        placeholder="Ej. 12345678"
      />

      {/* Botón */}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrar dueño</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    width: "100%", // Asegura que el contenedor ocupe todo el ancho
  },
  icon: {
    marginRight: 10,
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
    textAlign: "left", // Alinea el texto a la izquierda
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 15,
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "#009688",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});

export default VeterinarianAddPerson;