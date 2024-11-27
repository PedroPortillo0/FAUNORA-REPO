import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import NavbarVeterinarian from '../../components/organisms/NavbarVeterinarian';

const VeterinarianDatePage = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState('2024-11-03');
  const [appointments, setAppointments] = useState([
    { date: '2024-11-09', petName: 'Max', reason: 'Administración de vacunas necesarias para proteger a la mascota de enfermedades.', color: '#82C9A4', time: '10:35 AM' },
    { date: '2024-11-20', petName: 'Bella', reason: 'Revisión general de salud.', color: '#FFB6C1', time: '02:00 PM' },
  ]);

  const getAppointmentsForDate = (date) => {
    return appointments.filter(appointment => appointment.date === date);
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
      <ScrollView style={styles.appointmentList}>
        {getAppointmentsForDate(selectedDate).length > 0 ? (
          getAppointmentsForDate(selectedDate).map((appointment, index) => (
            <View key={index} style={styles.petCard}>
              <Image
                source={{ uri: 'https://placekitten.com/100/100' }}
                style={styles.petImage}
              />
              <View style={styles.appointmentDetails}>
                <Text style={styles.petName}>{appointment.petName}</Text>
                <Text style={styles.appointmentReason}>{appointment.reason}</Text>
                <Text style={styles.appointmentTime}>
                  Fecha de la cita: {selectedDate} {'\n'}Hora: {appointment.time}
                </Text>
              </View>
              <View style={[styles.colorBox, { backgroundColor: appointment.color }]} />
            </View>
          ))
        ) : (
          <Text style={styles.noAppointments}>No hay citas para esta fecha.</Text>
        )}
      </ScrollView>

      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('VeterinarianAddDate')}>
        <Ionicons name="add" size={24} color="white" />
        <Text style={styles.addButtonText}>Agendar cita</Text>
      </TouchableOpacity>
      <NavbarVeterinarian navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7F6E7',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#333',
    paddingTop: 40,
  },
  calendar: {
    marginHorizontal: 20,
    borderRadius: 10,
    elevation: 2,
  },
  appointmentList: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 20,
  },
  petCard: {
    width: '90%',  // Ajusta el tamaño de la tarjeta al 90% del ancho
    flexDirection: 'row',
    backgroundColor: '#F8F8F8',
    borderTopLeftRadius: 50,  // Esquina superior izquierda
    borderTopRightRadius: 10, // Esquina superior derecha
    borderBottomLeftRadius: 0, // Esquina inferior izquierda
    borderBottomRightRadius: 10, // Esquina inferior derecha
    marginVertical: 8,
    alignItems: 'center',
    alignSelf: 'center',  // Centra las tarjetas dentro del ScrollView
    elevation: 4, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  petImage: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 50,  // Esquina superior izquierda
    borderTopRightRadius: 0, // Esquina superior derecha
    borderBottomLeftRadius: 0, // Esquina inferior izquierda
    borderBottomRightRadius: 45, // Esquina inferior derecha
    marginRight: 15,
    alignSelf: 'flex-start',
  },
  appointmentDetails: {
    flex: 1,
  },
  petName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  appointmentReason: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
  },
  appointmentTime: {
    fontSize: 14,
    color: '#888',
  },
  noAppointments: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginTop: 20,
  },
  addButton: {
    backgroundColor: 'rgba(247, 67, 182, 0.37)',
    borderRadius: 10,
    width: 125,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 80,
    right: 20,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  colorBox: {
    width: 8,
    height: '70%',
    borderRadius: 5,
    marginLeft: 10,
  },
});

export default VeterinarianDatePage;
