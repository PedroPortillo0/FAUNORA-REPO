import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import NavbarVeterinarian from '../../components/organisms/NavbarVeterinarian';
import Icon from 'react-native-vector-icons/Ionicons'; // Importa el ícono

const VeterinarianHomePage = ({ navigation }) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);

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

    const handlePatientPress = (patient) => {
        navigation.navigate('VeterinaryPetsHome', { ownerName: patient.name });
    };

    return (
        <View style={styles.container}>
            <Image 
                source={require('../../../assets/logo2.png')}
                style={styles.logo}
            />
            <View style={styles.header}>
                <Text style={styles.welcomeText}>Bienvenido</Text>
                <View style={styles.searchContainer}>
                    <Icon name="search" size={20} color="#A0A0A0" style={styles.searchIcon} />
                    <TextInput 
                        style={styles.searchBar}
                        placeholder="Buscar por el nombre del dueño"
                    />
                </View>
            </View>

            <View style={styles.table}>
                <View style={styles.tableHeader}>
                    <Text style={styles.columnHeaderL}>ID</Text>
                    <Text style={styles.columnHeaderR}>Nombre del dueño</Text>
                </View>

                <ScrollView contentContainerStyle={styles.listContainer}>
                    {patients.map((patient) => (
                        <TouchableOpacity 
                            key={patient.id} 
                            style={styles.patientRow} 
                            onPress={() => handlePatientPress(patient)}
                        >
                            <Text style={styles.patientId}>{patient.id}</Text>
                            <Text style={styles.patientName}>{patient.name}</Text>
                            <TouchableOpacity onPress={() => toggleModal(patient)}>
                                <Ionicons name="ellipsis-vertical" size={20} color="#A0A0A0" />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('VeterinarianAddPerson')}>
                <Ionicons name="add" size={24} color="white" />
                <Text style={styles.addButtonText}>Agregar</Text>
            </TouchableOpacity>

            <NavbarVeterinarian navigation={navigation} />

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
        width: 50, // Ajusta el tamaño según sea necesario
        height: 50,
        position: 'absolute',
        top: 30, // Espaciado desde la parte superior
        left: 20, // Espaciado desde la izquierda
    },
    header: {
        paddingTop: 80, // Ajusta para que no se superponga con la imagen
        paddingHorizontal: 20,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#00B4A7',
        marginBottom: 20,
        alignSelf: 'flex-end',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0F0F0',
        borderRadius: 25,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    searchBar: {
        flex: 1,
        backgroundColor: '#F0F0F0',
        padding: 10,
        borderRadius: 25,
        paddingLeft: 10,
    },
    searchIcon: {
        marginRight: 10,
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
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10, 
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
    listContainer: {
        paddingBottom: 80,
    },
    patientRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    patientId: {
        fontSize: 16,
        color: '#909097',
        width: '10%',
        textAlign: 'center',
    },
    patientName: {
        fontSize: 16,
        color: '#909097',
        width: '80%',
    },
    addButton: {
        backgroundColor: 'rgba(247, 67, 182, 0.37)',
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
        width: '100%',
        alignItems: 'center',
    },
    modalButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
});

export default VeterinarianHomePage;