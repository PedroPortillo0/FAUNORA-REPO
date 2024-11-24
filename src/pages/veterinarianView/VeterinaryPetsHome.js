// VeterinaryPetsHome.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import Icon from '../../components/atoms/Icon';
import PetCard from '../../components/molecules/PetCard';
import NavbarVeterinarian from '../../components/organisms/NavbarVeterinarian';
import { useRoute } from '@react-navigation/native';

const VeterinaryPetsHome = ({ navigation }) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const route = useRoute();
    const { ownerName } = route.params;

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
            name: 'Mia',
            breed: 'Siamés',
            weight: 3.0,
            age: 7,
            gender: 'famale',
            imageUri: require('../../../assets/Mia.png'),
        },
    ];

    return (
        <View style={styles.container}>
            <Image source={require('../../../assets/logo2.png')} style={styles.logo} />
            <View style={styles.header}>
            <Text style={styles.headerText}>Mascotas de {ownerName}</Text>
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

            <ScrollView contentContainerStyle={styles.petList}>
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
                        targetScreen="VeterinarianPetDetails"
                    />
                ))}
            </ScrollView>

            <NavbarVeterinarian navigation={navigation} />
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
        top: 30,
        left: 20,
    },
    header: {
        paddingTop: 80,
        paddingHorizontal: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#00B4A7',
        marginBottom: 30,
        textAlign: 'right',
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

export default VeterinaryPetsHome;
