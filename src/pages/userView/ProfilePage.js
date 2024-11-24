import React, { useState } from 'react'; // Importa useState
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from 'react-native-vector-icons';
import WaveSvg from '../../../assets/WaveSvg'; // Importa el componente SVG
import Navbar from '../../components/organisms/Navbar'; // Importa el componente Navbar
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const UserProfile = ({ navigation }) => {
    // Estado booleano para determinar si el usuario tiene la corona
    const [isPremium, setIsPremium] = useState(true); // Puedes cambiarlo a false para probar

    return (
        <View style={styles.container}>
            {/* Fondo con cuadro de color */}
            <View style={styles.headerBackground}></View>
            
            {/* Onda */}
            <View style={styles.waveContainer}>
                <WaveSvg color="#E0F7FA" />
            </View>

            {/* Imagen de usuario */}
            <Image
                source={{ uri: 'https://i.imgur.com/4YB4hW3.png' }} // Sustituye con tu imagen
                style={styles.profileImage}
            />

            {/* Información del usuario */}
            <View style={styles.infoContainer}>
                <View style={styles.userNameContainer}>
                    <Text style={styles.userName}>Juan Pérez Cruz</Text>
                    {/* Mostrar la corona solo si isPremium es true */}
                    {isPremium && 
                        <MaterialCommunityIcons 
                            name="crown" 
                            size={16} 
                            color="#FFC107" 
                            style={styles.crownIcon} // Añadir estilo para separar la corona
                        />
                    }
                </View>
                <Text style={styles.subtitle}>Actualmente cuenta con 2 mascotas</Text>
                <Text style={styles.userId}>Identificador: 127520763</Text>

                {/* Información de contacto */}
                <View style={styles.contactContainer}>
                    <View style={styles.contactItem}>
                        <View style={styles.iconCircle}>
                            <FontAwesome name="phone" size={24} color="#31B3A9" />
                        </View>
                        <Text style={styles.contactText}>961 456 7890</Text>
                    </View>
                    <View style={styles.contactItem}>
                        <View style={styles.iconCircle}>
                            <FontAwesome name="envelope" size={24} color="#DC4638" />
                        </View>
                        <Text style={styles.contactText}>JuanPc@gmail.com</Text>
                    </View>
                </View>

            </View>

            {/* Contenedor para los botones, alineados hacia abajo */}
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.premiumButton}>
                    <Text style={styles.premiumText}>Volverse premium</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.logoutButton}>
                    <Text style={styles.logoutText}>Cerrar sesión</Text>
                </TouchableOpacity>
            </View>

            {/* Navbar */}
            <Navbar navigation={navigation} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
    },
    headerBackground: {
        width: '100%',
        height: 200, // Altura más grande
        backgroundColor: '#E0F7FA', // Mismo color que el wave
        position: 'absolute',
        top: 0,
    },
    waveContainer: {
        width: '100%',
        position: 'absolute',
        top: 200, // Ajusta esta posición según sea necesario
        transform: [{ rotate: '180deg' }],
        marginTop: -10,
    },
    profileImage: {
        width: 150, // Tamaño más grande
        height: 150,
        borderRadius: 75,
        marginTop: 50,
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    infoContainer: {
        width: '90%',
        alignItems: 'flex-start', // Alinea el texto a la izquierda
        marginTop: 70,
        flex: 1, // Esto hace que el contenedor ocupe el espacio restante
    },
    userNameContainer: {
        flexDirection: 'row', // Asegura que el texto y la corona estén en fila
        alignItems: 'center', // Centra verticalmente el texto y la corona
        marginBottom: 10, // Un pequeño margen abajo para separar el nombre de la siguiente línea
    },
    userName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#212121',
    },
    crownIcon: {
        marginLeft: 5, // Espacio pequeño a la izquierda de la corona
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
        width: 40,  // Asegura que el círculo tenga el mismo tamaño para ambos íconos
        height: 40,
        borderRadius: 20,  // Hace que el círculo sea perfectamente redondo
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E1E1E1',
        marginRight: 10,  // Espacio entre el icono y el texto
    },
    contactText: {
        fontSize: 16,
        color: '#212121',
    },
    iconBackground: {
        backgroundColor: '#E1E1E1',
        padding: 8,
        borderRadius: 50, // Haciendo el fondo circular
    },
    premiumButton: {
        backgroundColor: '#00B4A7',
        paddingVertical: 12,
        paddingHorizontal: 60,
        borderRadius: 30,
        marginVertical: 10,
        width: '100%',
        justifyContent: 'center', 
        alignItems: 'center',
        marginBottom: 20, // Espacio al fondo
    },
    premiumText: {
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
        width: '90%', // Asegura que los botones estén dentro de los límites del contenido
        marginBottom: 100, // Espacio al fondo
        justifyContent: 'flex-end', // Alinea los botones hacia abajo
    },
});

export default UserProfile;
