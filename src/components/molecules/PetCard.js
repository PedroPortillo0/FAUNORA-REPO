import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Modal, Text } from 'react-native';
import TextLabel from '../atoms/Text';
import TitleAtom from '../atoms/TitleAtom';
import Icon from '../atoms/Icon';
import ImageAtom from '../atoms/ImageAtom';

const PetCard = ({ navigation, id, name, breed, weight, age, gender, imageUri, targetScreen }) => {
    console.log(imageUri);
    console.log(name);
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const handlePress = () => {
        navigation.navigate(targetScreen, { id, name, breed, weight, age, gender, imageUri });
    };

    return (
        <TouchableOpacity onPress={handlePress} style={styles.card}>
            <ImageAtom source={{ uri: imageUri.uri }} style={styles.image} />
            <View style={styles.infoContainer}>
                <TitleAtom content={name} style={styles.name} />
                <TextLabel style={styles.breed}>{breed}</TextLabel>
                <TextLabel style={styles.details}>{weight} kg</TextLabel>
                <TextLabel style={styles.details}>{age} años</TextLabel>
            </View>
            <View style={styles.iconContainer}>
                <Icon name={gender === 'Macho' ? 'male' : 'female'} size={20} color="#555" />
                <TouchableOpacity onPress={toggleModal} style={styles.moreButton}>
                    <Icon name="ellipsis-vertical" size={20} color="#A0A0A0" />
                </TouchableOpacity>
            </View>

            {/* Modal para opciones */}
            <Modal
                visible={isModalVisible}
                transparent
                animationType="slide"
                onRequestClose={toggleModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity onPress={() => { console.log(`Editar ${name}`); toggleModal(); }}>
                            <Text style={styles.modalOption}>Editar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { console.log(`Eliminar ${name}`); toggleModal(); }}>
                            <Text style={styles.modalOption}>Eliminar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={toggleModal}>
                            <Text style={styles.modalCancel}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: '#F8F8F8',
        borderTopLeftRadius: 50,  // Esquina superior izquierda
        borderTopRightRadius: 10, // Esquina superior derecha
        borderBottomLeftRadius: 50, // Esquina inferior izquierda
        borderBottomRightRadius: 10, // Esquina inferior derecha
        marginVertical: 8,
        alignItems: 'center',
        elevation: 4, // Sombra para Android
        shadowColor: '#000', // Sombra para iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    image: {
        width: 100,
        height: 100,
        borderTopLeftRadius: 50, 
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 45,
        marginRight: 15,
    },
    infoContainer: {
        flex: 1,
    },
    moreButton: {
        marginTop: 30,
    },
    iconContainer: {
        position: 'absolute', // Para posicionarlo sobre la tarjeta
        top: 10,
        right: 15,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    breed: {
        fontSize: 14,
        color: '#777',
        marginTop: 4,
    },
    details: {
        fontSize: 13,
        color: '#555',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 20,
        width: 250,
        alignItems: 'center',
    },
    modalOption: {
        fontSize: 16,
        marginVertical: 10,
    },
    modalCancel: {
        fontSize: 16,
        marginTop: 15,
        color: 'red',
    },
});

export default PetCard;
