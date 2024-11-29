import React, { useState, useEffect } from 'react'; // Importa useState y useEffect
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { FontAwesome } from 'react-native-vector-icons';
import WaveSvg from '../../../assets/WaveSvg'; // Importa el componente SVG
import Navbar from '../../components/organisms/Navbar'; // Importa el componente Navbar
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa AsyncStorage

const UserProfile = ({ navigation }) => {
    const [userData, setUserData] = useState(null);
    const [isPremium, setIsPremium] = useState(true); // Puedes cambiarlo a false para probar

    useEffect(() => {
        const fetchUserData = async () => {
            const storedData = await AsyncStorage.getItem('userData');
            if (storedData) {
                const parsedData = JSON.parse(storedData);
                setUserData(parsedData); // Almacena los datos en el estado
            }
        };

        fetchUserData();
    }, []);

    if (!userData) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Cargando...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* Fondo con cuadro de color */}
                <View style={styles.headerBackground}></View>
                
                {/* Onda */}
                <View style={styles.waveContainer}>
                    <WaveSvg color="#E0F7FA" />
                </View>

                {/* Imagen de usuario */}
                <Image
                    source={require('../../../assets/PerfilImg.jpg')}
                    style={styles.profileImage}
                />

                {/* Información del usuario */}
                <View style={styles.infoContainer}>
                    <View style={styles.userNameContainer}>
                        <Text style={styles.userName}>
                            {userData.contact.firstName} {userData.contact.lastName}
                        </Text>
                        {isPremium && 
                            <MaterialCommunityIcons 
                                name="crown" 
                                size={16} 
                                color="#FFC107" 
                                style={styles.crownIcon}
                            />
                        }
                    </View>
                    <Text style={styles.subtitle}>Actualmente cuenta con 2 mascotas</Text>
                    <Text style={styles.userId}>Identificador: {userData.id}</Text>

                    {/* Información de contacto */}
                    <View style={styles.contactContainer}>
                        <View style={styles.contactItem}>
                            <View style={styles.iconCircle}>
                                <FontAwesome name="phone" size={24} color="#31B3A9" />
                            </View>
                            <Text style={styles.contactText}>{userData.contact.phone.replace('+521', '')}</Text>
                        </View>
                        <View style={styles.contactItem}>
                            <View style={styles.iconCircle}>
                                <FontAwesome name="envelope" size={24} color="#DC4638" />
                            </View>
                            <Text style={styles.contactText}>{userData.contact.email}</Text>
                        </View>
                    </View>
                </View>

                {/* Contenedor para los botones, alineados hacia abajo */}
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.premiumButton}>
                        <Text style={styles.premiumText}>Volverse premium</Text>
                    </TouchableOpacity>

                    {/* Botón de Aviso de Privacidad */}
                    <TouchableOpacity 
                        style={styles.privacyButton} 
                        onPress={() => Linking.openURL('https://drive.google.com/file/d/1GBj2ukhJPv-O-_oTy67TNLagi01WI0Gk/view?usp=sharing')}
                    >
                        <Text style={styles.privacyText}>Aviso de privacidad</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.logoutButton}>
                        <Text style={styles.logoutText}>Cerrar sesión</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Navbar */}
            <Navbar navigation={navigation} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        width: '100%',
    },
    scrollContainer: {
        flexGrow: 1,
        alignItems: 'center',
        width: '100%',
        paddingBottom: 100,
    },
    headerBackground: {
        width: '100%',
        height: 200,
        backgroundColor: '#E0F7FA',
        position: 'absolute',
        top: 0,
    },
    waveContainer: {
        width: '100%',
        position: 'absolute',
        top: 200,
        transform: [{ rotate: '180deg' }],
        marginTop: -10,
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 100,
        marginTop: 50,
    },
    infoContainer: {
        width: '90%',
        alignItems: 'flex-start',
        marginTop: 70,
    },
    userNameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    userName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#212121',
    },
    crownIcon: {
        marginLeft: 5,
    },
    subtitle: {
        fontSize: 14,
        color: '#757575',
        marginVertical: 4,
    },
    userId: {
        fontSize: 12,
        color: '#9E9E9E',
        marginBottom: 20,
    },
    contactContainer: {
        width: '100%',
        marginVertical: 20,
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    iconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E1E1E1',
        marginRight: 10,
    },
    contactText: {
        fontSize: 16,
        color: '#212121',
    },
    premiumButton: {
        backgroundColor: '#00B4A7',
        paddingVertical: 12,
        paddingHorizontal: 60,
        borderRadius: 30,
        width: '100%',
        justifyContent: 'center', 
        alignItems: 'center',
        marginBottom: 20,
    },
    privacyButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 12,
        paddingHorizontal: 60,
        borderRadius: 30,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    privacyText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    logoutButton: {
        backgroundColor: '#DC4638',
        paddingVertical: 12,
        paddingHorizontal: 60,
        borderRadius: 30,
        width: '100%',
        justifyContent: 'center', 
        alignItems: 'center',
    },
    logoutText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonsContainer: {
        width: '90%',
        marginBottom: 100,
        justifyContent: 'flex-end',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default UserProfile;
