import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import { LinearGradient } from 'expo-linear-gradient';
import ButtonAtom from '../../components/atoms/ButtonAtom';
import WaveSvg from '../../../assets/WaveSvg'; // Importa el componente SVG
import Navbar from '../../components/organisms/Navbar';
import { useFonts } from 'expo-font'; // Importar para cargar las fuentes

const PetDetails = ({ route, navigation }) => {
    const { id, name, breed, weight, age, gender, imageUri } = route.params;

    // Cargar la fuente Work Sans
    const [fontsLoaded] = useFonts({
        'WorkSans': require('@expo-google-fonts/work-sans').WorkSans_400Regular,
    });

    if (!fontsLoaded) {
        return <Text>Cargando fuentes...</Text>; // Muestra algo mientras se carga la fuente
    }

    const veterinaries = [
        { id: '1', name: 'Veterinaria 1', address: 'Calle A, Ciudad X', latitude: 10.0, longitude: -74.0 },
        { id: '2', name: 'Veterinaria 2', address: 'Calle B, Ciudad Y', latitude: 10.1, longitude: -74.1 },
        { id: '3', name: 'Veterinaria 3', address: 'Calle C, Ciudad Z', latitude: 10.2, longitude: -74.2 },
    ];

    const randomId = Math.floor(Math.random() * 1000000000);

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={styles.container}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('HomePage')}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Image source={imageUri} style={styles.image} />
                <View style={styles.contentContainer}>
                    <LinearGradient
                        colors={['#FDECD4', '#FDECD4']}
                        style={styles.gradientContainer}
                    >
                        <Text style={styles.name}>{name}</Text>
                        <Text style={styles.info}>{breed}</Text>
                        <Text style={styles.info}>Identificador: {randomId}</Text>
                        <View style={styles.cardGruop}>
                            <View style={styles.card}>
                                <Text style={styles.label}>Peso</Text>
                                <Text style={styles.value}>{weight} kg</Text>
                            </View>
                            <View style={styles.card}>
                                <Text style={styles.label}>Edad</Text>
                                <Text style={styles.value}>{age} años</Text>
                            </View>
                            <View style={styles.card}>
                                <Text style={styles.label}>Sexo</Text>
                                <Text style={styles.value}>{gender === 'male' ? 'Macho' : 'Hembra'}</Text>
                            </View>
                        </View>
                    </LinearGradient>
                    <View style={styles.waveContainer}>
                        <WaveSvg color="#FDECD4" />
                    </View>

                    {/* Datos del médico */}
                    <View style={styles.vetDetails}>
                        <View style={styles.vetColumns}>
                            {/* Columna Izquierda: Información */}
                            <View style={styles.vetInfoColumn}>
                                <Text style={styles.vetName}>Dr. Ana López</Text>
                                <View style={styles.vetRow}>
                                    <Ionicons name="call" size={18} color="#76D231" style={styles.vetIcon} />
                                    <Text style={styles.vetInfo}>961 456 7890</Text>
                                </View>
                                <View style={styles.vetRow}>
                                    <Ionicons name="mail" size={18} color="#DC4638" style={styles.vetIcon} />
                                    <Text style={styles.vetInfo}>dr.ana@animalcare.com</Text>
                                </View>
                                <View style={styles.vetAddressContainer}>
                                    <Ionicons name="location" size={18} color="#E60000" style={styles.vetIcon} />
                                    <Text style={styles.vetInfo}>Calle 123, Ciudad, País</Text>
                                </View>
                            </View>

                            {/* Columna Derecha: Foto */}
                            <View style={styles.vetPhotoColumn}>
                                <Image
                                    source={require('../../../assets/vetImg.png')} // Ruta de tu imagen
                                    style={styles.vetImage}
                                />
                            </View>
                        </View>
                    </View>

                    {/* Mapa */}
                    <View style={styles.mapContainer}>
                        <View style={styles.mapWrapper}>
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
                    </View>

                    <ButtonAtom
                        title="Ver historial médico"
                        onPress={() => navigation.navigate('Login')}
                        style={styles.button}
                    />
                </View>
            </ScrollView>
            <Navbar navigation={navigation} />
        </View>
    );
};

// Estilos actualizados
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9D877',
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 1,
    },
    contentContainer: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50, 
        alignItems: 'center',
        paddingBottom: 20,
    },
    gradientContainer: {
        width: '100%',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        paddingLeft: 30,
        paddingTop: 80,
        alignItems: 'flex-start',
    },
    waveContainer: {
        width: '100%',
        transform: [{ rotate: '180deg' }],
        marginTop: -10,
    },
    image: {
        zIndex: 2,
        top: 90,
        width: 150,
        height: 150,
        borderRadius: 100,
        marginBottom: 20,
        alignSelf: 'center',
    },
    name: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    info: {
        fontSize: 16,
        marginVertical: 5,
    },
    cardGruop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
    },
    card: {
        marginTop: 30,
        backgroundColor: 'rgba(210, 164, 119, 0.5)', 
        borderRadius: 10,
        padding: 10,
        marginVertical: 5,
        width: '30%',
        height: 80,
        justifyContent: 'center', 
    },
    label: {
        fontSize: 16,
        color: '#000000',
    },
    value: {
        fontSize: 16,
        color: '#FFFFFF',
    },
    vetDetails: {
    width: '90%',
    },
    vetColumns: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Divide en dos columnas
    },
    vetInfoColumn: {
        flex: 3, // Columna más ancha para la información
        justifyContent: 'center',
    },
    vetPhotoColumn: {
        flex: 1, // Columna más estrecha para la foto
        alignItems: 'center', // Centra la imagen horizontalmente
        justifyContent: 'center', // Centra la imagen verticalmente
    },
    vetName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 10,
    },
    vetRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },    
    vetAddressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 30, // Separación entre los textos
    }, 
    vetIcon: {
        marginRight: 10,
    },
    vetInfo: {
        fontSize: 16,
        color: '#333333',
    },
    vetImage: {
        width: 90,
        height: 90,
        borderRadius: 20, // Hace la imagen circular
    }, 
    mapContainer: {
        width: '100%',
        padding: 20,
    },
    mapWrapper: {
        width: '100%',
        height: 200,
        borderRadius: 20,
        overflow: 'hidden',
    },
    map: {
        flex: 1,
    },
    button: {
        width: '90%',
        marginTop: 25,
    },
});

export default PetDetails;
