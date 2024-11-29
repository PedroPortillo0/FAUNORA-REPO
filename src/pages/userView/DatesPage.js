import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Navbar from '../../components/organisms/Navbar';

const MyCalendarScreen = ({navigation}) => {
  const [selectedDate, setSelectedDate] = useState('2022-01-13');
  const [appointments, setAppointments] = useState([
    { date: '2022-01-13', petName: 'Max', reason: 'Baño antipulgas.', color: '#FF5733', time: '10:00 AM' },
    { date: '2022-01-13', petName: 'Max', reason: 'Administración de vacunas necesarias para proteger a la mascota de enfermedades.', color: '#FF5733', time: '11:00 AM' },
    { date: '2022-01-18', petName: 'Bella', reason: 'Revisión general de salud.', color: '#33CFFF', time: '02:00 PM' },
    { date: '2022-01-20', petName: 'Rex', reason: 'Vacunas anuales.', color: '#C1F633', time: '09:00 AM' },
  ]);

  // Obtener citas para una fecha específica
  const getAppointmentsForDate = (date) => {
    return appointments.filter(appointment => appointment.date === date);
  };

  // Marcar las fechas con citas y asignar el color correspondiente a cada una
  const markedDates = appointments.reduce((acc, appointment) => {
    acc[appointment.date] = { 
      marked: true, 
      dotColor: appointment.color,  // Asigna el color de la mascota al marcador del calendario
      selectedColor: 'blue', 
      selectedTextColor: 'white' 
    };
    return acc;
  }, {});

  // Marcar el día seleccionado
  markedDates[selectedDate] = {
    ...markedDates[selectedDate],
    selected: true,
    selectedColor: 'green',
    selectedTextColor: 'white'
  };

  return (
    <View style={styles.container}>
      <View style={styles.calendarWrapper}>
        <Calendar
          current={selectedDate}
          markedDates={markedDates}  // Marcar las fechas con citas y el día seleccionado
          onDayPress={(day) => {
            setSelectedDate(day.dateString);
          }}
          monthFormat={'yyyy MM'}
          horizontal={true}  // Habilita desplazamiento horizontal entre meses
          pagingEnabled={true}  // Habilita la paginación
          theme={{
            todayTextColor: 'green',
            arrowColor: 'green',
            monthTextColor: 'black',
            textSectionTitleColor: 'grey',
            selectedDayBackgroundColor: 'green',
            selectedDayTextColor: 'white',
            dotColor: 'red', // Para los puntos de las fechas marcadas
            dayTextColor: 'black',
            textDayFontWeight: 'bold',
            textMonthFontWeight: 'bold',
            textMonthFontSize: 16,
          }}
          style={styles.calendar}
        />
      </View>

      <ScrollView style={styles.appointmentList}>
        {getAppointmentsForDate(selectedDate).length === 0 ? (
          <Text style={styles.noAppointmentsText}>No hay ninguna cita agendada para esta fecha.</Text>
        ) : (
          getAppointmentsForDate(selectedDate).map((appointment, index) => (
            <View key={index} style={styles.petCard}>
              <Image
                source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPUPPObe8bkov6CluwLDx5FNgla0wkgvJxAgPhrGxg_ZcXu36M1nBLZDnHfRyltQNjZVw4VROMhokT0D4mTrQ57g' }} // Aquí puedes poner la imagen del animal
                style={styles.petImage}
              />
              <View style={styles.appointmentDetails}>
                <Text style={styles.petName}>{appointment.petName}</Text>
                <Text style={styles.appointmentReason}>{appointment.reason}</Text>
                <Text style={styles.appointmentTime}>{appointment.time}</Text>
              </View>
              {/* Cuadrito de color para identificar la mascota */}
              <View style={[styles.colorBox, { backgroundColor: appointment.color }]} />
            </View>
          ))
        )}
      </ScrollView>

      <Navbar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DFD3C3',
    paddingTop: 20,
  },
  calendar: {
    borderRadius: 10,
  },
  calendarWrapper: {
    width: '90%',  // Ajusta el ancho del calendario al 90% del contenedor
    alignSelf: 'center',  // Centra el calendario horizontalmente
    padding: 20,
    borderRadius: 20,  // Agrega borderRadius aquí para redondear las esquinas del calendario
    overflow: 'hidden',  // Esto asegura que las esquinas redondeadas funcionen bien con el contenido interno
  },
  appointmentList: {
    backgroundColor: '#F8F8F8',
    borderTopLeftRadius: 50,  // Esquina superior izquierda
    borderTopRightRadius: 50, // Esquina superior derecha
    padding: 10,
    paddingTop: 30,
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
    alignSelf: 'flex-start', // Alinea la imagen arriba
  },
  appointmentDetails: {
    flex: 1,
  },
  petName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  appointmentReason: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },
  appointmentTime: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  colorBox: {
    width: 8,
    height: '70%',
    borderRadius: 5,
    marginLeft: 10,
  },
  noAppointmentsText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
    marginVertical: 20,
    fontStyle: 'italic',
  },
  
});

export default MyCalendarScreen;
