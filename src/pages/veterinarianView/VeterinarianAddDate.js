import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import NavbarVeterinarian from '../../components/organisms/NavbarVeterinarian';
import DateTimePicker from '@react-native-community/datetimepicker';

const VeterinarianAddDate = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState('2024-11-03');
  const [appointments, setAppointments] = useState([
    { date: '2024-11-09', petName: 'Max', reason: 'Administración de vacunas necesarias para proteger a la mascota de enfermedades.', color: '#82C9A4', time: '10:35 AM' },
    { date: '2024-11-20', petName: 'Bella', reason: 'Revisión general de salud.', color: '#FFB6C1', time: '02:00 PM' },
  ]);
  
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [chosenDate, setChosenDate] = useState(new Date());

  const handleRegister = () => {
    navigation.navigate('VeterinarianHome');
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || chosenDate;
    setShowDatePicker(false);
    setChosenDate(currentDate);
    setSelectedDate(currentDate.toISOString().split('T')[0]); // Formatear a 'YYYY-MM-DD'
  };

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const markedDates = appointments.reduce((acc, appointment) => {
    acc[appointment.date] = {
      marked: true,
      dotColor: appointment.color,
    };
    return acc;
  }, {});

  markedDates[selectedDate] = {
    ...markedDates[selectedDate],
    selected: true,
    selectedColor: '#82C9A4',
    selectedTextColor: '#FFF',
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('HomePage')}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.header}></View>
        <Calendar
          current={selectedDate}
          markedDates={markedDates}
          onDayPress={(day) => setSelectedDate(day.dateString)}
          theme={{
            todayTextColor: '#82C9A4',
            arrowColor: '#82C9A4',
            monthTextColor: '#333',
            textSectionTitleColor: '#777',
            selectedDayBackgroundColor: '#82C9A4',
            selectedDayTextColor: '#FFF',
            dotColor: '#82C9A4',
          }}
          style={styles.calendar}
        />

        {/* Cuadro blanco con el formulario */}
        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>Información del dueño</Text>

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
            placeholder="Ej. Max"
          />

          <View style={styles.inputContainer}>
            <MaterialCommunityIcons
              name="card-account-details"
              size={20}
              color="#0078FF"
              style={styles.icon}
            />
            <Text style={styles.label}>Identificador de la mascota</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Ej. 1984713247"
          />

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Motivo de la cita</Text>
          </View>
          <TextInput
            style={styles.inputLarge} // Usamos el estilo ajustado
            placeholder="Ej. Administración de vacunas necesarias para proteger a la mascota de enfermedades."
            multiline={true} // Permite que el texto se desborde hacia abajo
            numberOfLines={4} // Opcional: ajusta el número de líneas visibles
            />

          <View style={styles.inputContainer}>
            <MaterialCommunityIcons
              name="calendar"
              size={20}
              color="#0078FF"
              style={styles.icon}
            />
            <Text style={styles.label}>Fecha de la cita</Text>
          </View>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.inputText}>{formatDate(chosenDate)}</Text> {/* Formato de fecha aquí */}
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={chosenDate}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}

          <View style={styles.inputContainer}>
            <MaterialCommunityIcons
              name="comment-text"
              size={20}
              color="#76D231"
              style={styles.icon}
            />
            <Text style={styles.label}>Comentario</Text>
          </View>
          <TextInput
            style={styles.inputLarge} // Usamos el estilo ajustado
            placeholder="Ej. Favor de llevar el dinero justo"
            multiline={true} // Permite que el texto se desborde hacia abajo
            numberOfLines={4} // Opcional: ajusta el número de líneas visibles
            />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Agendar cita</Text>
        </TouchableOpacity>
      </ScrollView>
      <NavbarVeterinarian navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7F6E7',
  },
  scrollContainer: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    zIndex: 1,
  },
  header: {
    marginVertical: 10,
    paddingTop: 60,
  },
  calendar: {
    borderRadius: 10,
    width: '100%',
    elevation: 2,
  },
  formContainer: {
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginTop: 5,
    textAlign: "left",
  },
  icon: {
    marginRight: 10,
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
  inputLarge: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 12, // Mantener el padding, pero ajustar para mayor comodidad
    marginBottom: 15,
    backgroundColor: "white",
    height: 120, // Altura ajustada para permitir texto más largo
    textAlignVertical: 'top', // Alinear el texto al principio (arriba)
  },
  inputText: {
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#00B4A7",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginTop: 20,
    width: "90%",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 100,
  },
  buttonText: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default VeterinarianAddDate;
