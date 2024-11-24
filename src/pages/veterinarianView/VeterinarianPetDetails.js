import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import WaveSvg from '../../../assets/WaveSvg'; // Importa el componente SVG
import Navbar from '../../components/organisms/Navbar';
import { useFonts } from 'expo-font'; // Importar para cargar las fuentes

const VeterinarianPetDetails = ({ route, navigation }) => {
    const { id, name, breed, weight, age, gender, imageUri } = route.params;

    // Cargar la fuente Work Sans
    const [fontsLoaded] = useFonts({
        'WorkSans': require('@expo-google-fonts/work-sans').WorkSans_400Regular,
    });

    if (!fontsLoaded) {
        return <Text>Cargando fuentes...</Text>; // Muestra algo mientras se carga la fuente
    }

    const randomId = Math.floor(Math.random() * 1000000000);

    return (
        <View style={styles.screen}>
            <ScrollView 
                style={styles.scrollContainer}
                contentContainerStyle={styles.scrollContent}>
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
                        <View style={styles.vetInfoColumn}>
                            <Text style={styles.vetTitle}>Datos del dueño</Text>
                            <Text style={styles.vetName}>Juan Pérez Cruz</Text>
                            <View style={styles.vetRow}>
                                <Ionicons name="call" size={18} color="#76D231" style={styles.vetIcon} />
                                <Text style={styles.vetInfo}>961 456 7890</Text>
                            </View>
                            <View style={styles.vetRow}>
                                <Ionicons name="mail" size={18} color="#DC4638" style={styles.vetIcon} />
                                <Text style={styles.vetInfo}>JuanPc@gmail.com</Text>
                            </View>
                            <View style={styles.vetRow}>
                                <FontAwesome name="id-badge" size={18} color="#000000" style={styles.vetIcon} />
                                <Text style={styles.vetInfo}>Identificador: {randomId}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <Navbar navigation={navigation} />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#F9D877',
    },
    scrollContainer: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
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
        flexGrow: 1, // Asegura que el contenido ocupe todo el espacio disponible
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
    vetInfoColumn: {
        justifyContent: 'center',
    },
    vetName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 10,
    },
    vetTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 10,
    },
    vetRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    vetIcon: {
        marginRight: 10,
    },
    vetInfo: {
        fontSize: 16,
        color: '#333333',
    },
});

export default VeterinarianPetDetails;
