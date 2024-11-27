import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import Icon from '../../components/atoms/Icon';
import PetCard from '../../components/molecules/PetCard';
import Navbar from '../../components/organisms/Navbar';

const HomePageMain = ({ navigation }) => {
    const [isModalVisible, setModalVisible] = useState(false);

    const pets = [
        {
            id: '1',
            name: 'Max',
            breed: 'Chihuahua',
            weight: 2.5,
            age: 5,
            gender: 'male',
            imageUri: require('../../../assets/Max.png'),
        },
        {
            id: '2',
            name: 'Rocky',
            breed: 'Beagle',
            weight: 3.0,
            age: 7,
            gender: 'male',
            imageUri: require('../../../assets/Rocky.png'),
        },
        {
            id: '3',
            name: 'Mia',
            breed: 'Siamés',
            weight: 3.0,
            age: 7,
            gender: 'female',
            imageUri: require('../../../assets/Mia.png'),
        },
    ];

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Image source={require('../../../assets/logo2.png')} style={styles.logo} />
                <View style={styles.header}>
                    <Text style={styles.welcomeText}>Bienvenido Alejandro</Text>
                    <View style={styles.searchContainer}>
                        <Icon name="search" size={20} color="#A0A0A0" style={styles.searchIcon} />
                        <TextInput
                            style={styles.searchBar}
                            placeholder="Busca el nombre de tu mascota"
                            placeholderTextColor="#A0A0A0"
                        />
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.menuContainer}>
                        <TouchableOpacity style={styles.menuItem}>
                            <Text style={styles.menuText}>Perros</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem}>
                            <Text style={styles.menuText}>Gatos</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem}>
                            <Text style={styles.menuText}>Pajaros</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem}>
                            <Text style={styles.menuText}>Peces</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem}>
                            <Text style={styles.menuText}>Hámsters</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>

                <View style={styles.petList}>
                    {pets.map((pet) => (
                        <PetCard
                            key={pet.id}
                            navigation={navigation}
                            id={pet.id}
                            name={pet.name}
                            breed={pet.breed}
                            weight={pet.weight}
                            age={pet.age}
                            gender={pet.gender}
                            imageUri={pet.imageUri}
                            targetScreen="PetDetails"
                        />
                    ))}
                </View>
            </ScrollView>

            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('PetForm')}>
                <Icon name="add" size={24} color="white" />
                <Text style={styles.addButtonText}>Agregar</Text>
            </TouchableOpacity>
            <Navbar navigation={navigation} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 100, // Espacio adicional para el botón de agregar
    },
    logo: {
        width: 50,
        height: 50,
        position: 'absolute',
        top: 30,
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
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0F0F0',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    searchBar: {
        flex: 1,
        backgroundColor: '#F0F0F0',
        padding: 10,
        borderRadius: 25,
    },
    searchIcon: {
        marginRight: 5,
    },
    menuContainer: {
        marginTop: 10,
    },
    menuItem: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    menuText: {
        color: 'black',
        fontSize: 14,
        fontWeight: 'bold',
    },
    petList: {
        paddingHorizontal: 20,
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
});

export default HomePageMain;