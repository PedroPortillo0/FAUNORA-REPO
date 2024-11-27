import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import Navbar from '../../components/organisms/Navbar'; // Importa el componente Navbar

const ReportPage = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState('2023-10-16');
  const [data, setData] = useState({
    '2023-10-16': {
      dailyConsumption: [20, 45, 28, 80, 99, 43, 50],
      foodTypes: [
        { name: 'Beneful', population: 25, color: '#e7ce39', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'Brit Care', population: 40, color: '#9fd895', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'Pedigri', population: 35, color: '#d58560', legendFontColor: '#7F7F7F', legendFontSize: 15 },
      ],
      foodExpenses: [55, 95, 200, 140, 240, 310],
    },
    '2023-10-17': {
      dailyConsumption: [30, 40, 35, 70, 90, 50, 60],
      foodTypes: [
        { name: 'Beneful', population: 30, color: '#e7ce39', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'Brit Care', population: 35, color: '#9fd895', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'Pedigri', population: 35, color: '#d58560', legendFontColor: '#7F7F7F', legendFontSize: 15 },
      ],
      foodExpenses: [80, 130, 50, 190, 210, 300],
    },
    '2023-10-18': {
      dailyConsumption: [25, 35, 45, 55, 65, 75, 85],
      foodTypes: [
        { name: 'Beneful', population: 20, color: '#e7ce39', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'Brit Care', population: 50, color: '#9fd895', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'Pedigri', population: 30, color: '#d58560', legendFontColor: '#7F7F7F', legendFontSize: 15 },
      ],
      foodExpenses: [80, 100, 70, 280, 160, 300],
    },
    '2023-10-19': {
      dailyConsumption: [15, 25, 35, 45, 55, 65, 75],
      foodTypes: [
        { name: 'Beneful', population: 40, color: '#e7ce39', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'Brit Care', population: 30, color: '#9fd895', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'Pedigri', population: 30, color: '#d58560', legendFontColor: '#7F7F7F', legendFontSize: 15 },
      ],
      foodExpenses: [40, 120, 70, 200, 250, 180],
    },
  });

  // Marcar las fechas con datos y asignar el color correspondiente a cada una
  const markedDates = Object.keys(data).reduce((acc, date) => {
    acc[date] = { 
      marked: true, 
      dotColor: 'blue',  // Asigna el color del marcador del calendario
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

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const selectedData = data[selectedDate] || data['2023-10-16'];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Foto de la mascota */}
        <Image
          source={require('../../../assets/Max.png')} // Sustituye con la ruta de tu imagen local
          style={styles.petImage}
        />

        {/* Calendario */}
        <View style={styles.calendarWrapper}>
          <Calendar
            current={selectedDate}
            markedDates={markedDates}  // Marcar las fechas con datos y el día seleccionado
            onDayPress={handleDayPress}
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

        {/* Título de Alimentación */}
        <Text style={styles.mainTitle}>Alimentación</Text>

        {/* Gráficas */}
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Consumo diario</Text>
          <BarChart
            data={{
              labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
              datasets: [
                {
                  data: selectedData.dailyConsumption
                }
              ]
            }}
            width={Dimensions.get('window').width - 40}
            height={220}
            yAxisLabel=""
            chartConfig={{
              backgroundColor: '#1cc910',
              backgroundGradientFrom: '#43a047',
              backgroundGradientTo: '#66bb6a',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726'
              }
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
              marginBottom: 20, // Espacio adicional entre gráficas
            }}
          />

          <Text style={styles.chartTitle}>Tipo de alimentos</Text>
          <PieChart
            data={selectedData.foodTypes}
            width={Dimensions.get('window').width - 40}
            height={220}
            chartConfig={{
              backgroundColor: '#1cc910',
              backgroundGradientFrom: '#43a047',
              backgroundGradientTo: '#66bb6a',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726'
              }
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
            style={{
              marginVertical: 8,
              borderRadius: 16,
              marginBottom: 20, // Espacio adicional entre gráficas
            }}
          />

          <Text style={styles.chartTitle}>Gasto en comida</Text>
          <LineChart
            data={{
              labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
              datasets: [
                {
                  data: selectedData.foodExpenses
                }
              ]
            }}
            width={Dimensions.get('window').width - 40} // from react-native
            height={220}
            yAxisLabel="$"
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726'
              }
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
              paddingBottom: 30, // Espacio adicional para que no lo tape el navbar
            }}
          />
        </View>
      </ScrollView>
      <Navbar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE3F7',
  },
  calendarWrapper: {
    width: '100%',
    alignSelf: 'center',
    padding: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  calendar: {
    borderRadius: 10,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    paddingBottom: 40, // Espacio adicional para que no lo tape el navbar
  },
  petImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  chartContainer: {
    width: '100%',
    alignItems: 'center',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
});

export default ReportPage;