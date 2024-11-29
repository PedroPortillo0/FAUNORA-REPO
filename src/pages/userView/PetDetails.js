import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import { LinearGradient } from 'expo-linear-gradient';
import ButtonAtom from '../../components/atoms/ButtonAtom';
import WaveSvg from '../../../assets/WaveSvg'; 
import Navbar from '../../components/organisms/Navbar';
import { useFonts } from 'expo-font';

const PetDetails = ({ route, navigation }) => {
    const { id, name, breed, weight, age, gender, imageUri, height } = route.params;

    const [fontsLoaded] = useFonts({
        'WorkSans': require('@expo-google-fonts/work-sans').WorkSans_400Regular,
    });

    const [hasVeterinary, setHasVeterinary] = useState(true); // Estado para controlar si tiene veterinario

    if (!fontsLoaded) {
        return <Text>Cargando fuentes...</Text>;
    }

    const veterinaries = [
        { id: '1', name: 'Veterinaria 1', address: 'Calle A, Ciudad X', latitude: 10.0, longitude: -74.0 },
        { id: '2', name: 'Veterinaria 2', address: 'Calle B, Ciudad Y', latitude: 10.1, longitude: -74.1 },
        { id: '3', name: 'Veterinaria 3', address: 'Calle C, Ciudad Z', latitude: 10.2, longitude: -74.2 },
    ];

    return (
        <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
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
                        <Text style={styles.info}>Identificador: {id}</Text>
                        <View style={styles.cardGruop}>
                            <View style={styles.card}>
                                <Text style={styles.label}>Edad</Text>
                                <Text style={styles.value}>{age} años</Text>
                            </View>
                            <View style={styles.card}>
                                <Text style={styles.label}>Sexo</Text>
                                <Text style={styles.value}>{gender === 'Macho' ? 'Macho' : 'Hembra'}</Text>
                            </View>
                            <View style={styles.card}>
                                <Text style={styles.label}>Peso</Text>
                                <Text style={styles.value}>{weight} kg</Text>
                            </View>
                            <View style={styles.card}>
                                <Text style={styles.label}>Altura</Text>
                                <Text style={styles.value}>{height} cm</Text>
                            </View>
                        </View>
                    </LinearGradient>
                    <View style={styles.waveContainer}>
                        <WaveSvg color="#FDECD4" />
                    </View>

                    {/* Mostrar contenido según el booleano */}
                    {hasVeterinary ? (
                        <>
                            <View style={styles.vetDetails}>
                                <View style={styles.vetColumns}>
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
                                </View>
                            </View>
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
                        </>
                    ) : (
                        <View style={styles.noVeterinaryContainer}>
                            <Text style={styles.noVeterinaryText}>¿Tu mascota aún no tiene veterinario?</Text>
                            <ButtonAtom
                                title="Buscar veterinario"
                                onPress={() => navigation.navigate('SearchVeterinary')}
                                style={styles.buttonSerch}
                            />
                        </View>
                    )}

                    <ButtonAtom
                        title="Ver historial médico"
                        onPress={() => navigation.navigate('Login')}
                        style={styles.button}
                    />
                </View>
            </ScrollView>
            {/* <Navbar navigation={navigation} />*/}
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
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: '#F9D877',
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 1,
    },
    contentContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50, 
        alignItems: 'center',
        paddingBottom: 20,
        paddingTop: 20, // Ajusta el margen superior para que se superponga con la imagen
    },
    gradientContainer: {
        width: '100%',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        paddingLeft: 30,
        paddingTop: 50,
        marginTop: -20,
        alignItems: 'flex-start',
    },
    waveContainer: {
        width: '100%',
        transform: [{ rotate: '180deg' }],
        marginTop: -1,
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
        width: '95%',
    },
    card: {
        marginTop: 30,
        backgroundColor: 'rgba(210, 164, 119, 0.5)', 
        borderRadius: 10,
        padding: 10,
        marginVertical: 5,
        width: '23%',
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
    width: '85%',
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
        marginBottom: 80,
    },
    buttonSerch: {
        width: '90%',
        marginTop: 25,
    },
    noVeterinaryContainer: {
        alignItems: 'center',
        marginVertical: 20,
        width: '100%',
    },
    noVeterinaryText: {
        fontSize: 18,
        marginBottom: 10,
        color: '#000',
        textAlign: 'center',
    },
});

export default PetDetails;