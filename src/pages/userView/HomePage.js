import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import MapView, { Marker } from 'react-native-maps';

const HomePage = ({ navigation }) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [veterinaries] = useState([
        { id: '1', name: 'Veterinaria 1', address: 'Calle A, Ciudad X', latitude: 10.0, longitude: -74.0 },
        { id: '2', name: 'Veterinaria 2', address: 'Calle B, Ciudad Y', latitude: 10.1, longitude: -74.1 },
        { id: '3', name: 'Veterinaria 3', address: 'Calle C, Ciudad Z', latitude: 10.2, longitude: -74.2 },
    ]);

    const patients = [
        { id: '1', name: 'Juan Pérez Cruz' },
        { id: '2', name: 'María José Ramírez López' },
        { id: '3', name: 'Ana Lucía Gómez Sánchez' },
        { id: '4', name: 'Juan Pablo Pérez Rodríguez' },
        { id: '5', name: 'Laura Sofía Fernández Martínez' },
        { id: '6', name: 'Carlos Alberto Herrera González' },
    ];

    const toggleModal = (patient) => {
        setSelectedPatient(patient);
        setModalVisible(!isModalVisible);
    };

    const handleEdit = () => {
        console.log(`Editando paciente: ${selectedPatient.name}`);
        toggleModal(null);
    };

    const handleDelete = () => {
        console.log(`Eliminando paciente: ${selectedPatient.name}`);
        toggleModal(null);
    };

    return (
        <View style={styles.container}>
            <Image 
                source={require('../../../assets/logo2.png')}
                style={styles.logo}
            />

            <View style={styles.header}>
                <Text style={styles.welcomeText}>Bienvenido Alejandro</Text>
                <TextInput 
                    style={styles.searchBar}
                    placeholder="Busca el nombre de tu mascota"
                />
            </View>

            {/* Cuadro de Mapa */}
            <View style={styles.mapContainer}>
                <Text style={styles.mapTitle}>Veterinarias Cercanas</Text>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 10.0,
                        longitude: -74.0,
                        latitudeDelta: 0.05,
                        longitudeDelta: 0.05,
                    }}
                >
                    {veterinaries.map((veterinary) => (
                        <Marker
                            key={veterinary.id}
                            coordinate={{ latitude: veterinary.latitude, longitude: veterinary.longitude }}
                            title={veterinary.name}
                            description={veterinary.address}
                        />
                    ))}
                </MapView>
            </View>

            <View style={styles.table}>
                <View style={styles.tableHeader}>
                    <Text style={styles.columnHeaderL}>ID</Text>
                    <Text style={styles.columnHeaderR}>Nombre del dueño</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddPatient')}>
                <Ionicons name="add" size={24} color="white" />
                <Text style={styles.addButtonText}>Agregar</Text>
            </TouchableOpacity>

            <View style={styles.navbar}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Ionicons name="home" size={24} color="#31B3A9" />
                    <Text style={styles.navText}>Inicio</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Appointments')}>
                    <Ionicons name="calendar" size={24} color="#A0A0A0" />
                    <Text style={styles.navText}>Citas</Text>
                </TouchableOpacity>
            </View>

            <Modal isVisible={isModalVisible}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Opciones para {selectedPatient?.name}</Text>
                    <TouchableOpacity style={styles.modalButton} onPress={handleEdit}>
                        <Text style={styles.modalButtonText}>Editar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.modalButton} onPress={handleDelete}>
                        <Text style={styles.modalButtonText}>Eliminar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.modalButton} onPress={() => toggleModal(null)}>
                        <Text style={styles.modalButtonText}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    logo: {
        width: 50,
        height: 50,
        position: 'absolute',
        top: 20,
        left: 20,
    },
    header: {
        paddingTop: 80,
        paddingHorizontal: 20,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#00B4A7',
        marginBottom: 20,
        alignSelf: 'flex-end',
    },
    searchBar: {
        width: '90%',
        alignSelf: 'center',
        backgroundColor: '#F0F0F0',
        padding: 10,
        borderRadius: 25,
        marginBottom: 20,
        paddingLeft: 20,
    },
    mapContainer: {
        borderRadius: 10,
        overflow: 'hidden',
        marginHorizontal: 20,
        marginBottom: 20,
    },
    mapTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#00B4A7',
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#F9F9F9',
    },
    map: {
        width: '100%',
        height: 200, // Altura del mapa
    },
    table: {
        marginHorizontal: 20,
        marginTop: 10,
        height: '100%',
    },
    tableHeader: {
        flexDirection: 'row',
        paddingVertical: 10,
        backgroundColor: '#00B4A7',
    },
    columnHeaderR: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
        width: '90%',
        textAlign: 'left',
    },
    columnHeaderL: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
        width: '10%',
        textAlign: 'center',
    },
    addButton: {
        backgroundColor: 'rgba(247, 67, 182, 0.47)',
        borderRadius: 10,
        width: 110,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        position: 'absolute',
        bottom: 80,
        right: 20,
    },
    addButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#FFFFFF',
    },
    navText: {
        fontSize: 12,
        color: '#A0A0A0',
        marginTop: 5,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    modalButton: {
        backgroundColor: '#00B4A7',
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
        width: '80%',
        alignItems: 'center',
    },
    modalButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default HomePage;
