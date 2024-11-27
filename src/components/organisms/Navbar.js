import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavbarOption from '../molecules/NavbarOption';

const Navbar = ({ navigation }) => {
    const [selectedOption, setSelectedOption] = useState('Inicio');

    // Recuperar la última opción seleccionada desde AsyncStorage
    useEffect(() => {
        const getSelectedOption = async () => {
            try {
                const storedOption = await AsyncStorage.getItem('selectedOption');
                if (storedOption) {
                    setSelectedOption(storedOption);
                }
            } catch (error) {
                console.error("Error al obtener la opción seleccionada:", error);
            }
        };

        getSelectedOption();
    }, []);

    const handlePress = (option) => {
        setSelectedOption(option);

        // Guardar la opción seleccionada en AsyncStorage
        AsyncStorage.setItem('selectedOption', option);

        // Navegación según la opción seleccionada
        if (option === 'Inicio') {
            navigation.navigate('HomePage');
        } else if (option === 'Perfil') {
            navigation.navigate('UserProfile'); // Redirige a la pantalla de UserProfile
        } else if (option === 'Citas') {
            navigation.navigate('MyCalendarScreen'); // Redirige a la pantalla de MyCalendarScreen
        } else if (option === 'Reporte') {
            navigation.navigate('ReportPage'); // Redirige a la pantalla de ReportPage
        } else {
            navigation.navigate(option);
        }
    };

    return (
        <View style={styles.navbar}>
            {[
                { iconName: 'stats-chart', label: 'Reporte' },
                { iconName: 'home', label: 'Inicio' },
                { iconName: 'person', label: 'Perfil' },
                { iconName: 'calendar', label: 'Citas' },
            ].map((item) => (
                <NavbarOption
                    key={item.label}
                    iconName={item.iconName}
                    label={item.label}
                    onPress={() => handlePress(item.label)}
                    iconColor={selectedOption === item.label ? '#31B3A9' : '#000000'}
                    labelColor={selectedOption === item.label ? '#31B3A9' : '#000000'}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 15,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
});

export default Navbar;