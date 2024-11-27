import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Modal, Text, TextInput, Pressable } from 'react-native';
import ButtonAtom from '../../components/atoms/ButtonAtom';
import ImageAtom from '../../components/atoms/ImageAtom';
import WrapperText from '../../components/molecules/WrapperText'; 
import SubtitleAtom from '../../components/atoms/SubtitleAtom';

const LandingPage = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [code, setCode] = useState('');

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setCode('');
  };

  const handleSubmitCode = () => {
    // Validación simple: verifica si el código tiene 5 dígitos
    if (code.length === 5) {
      alert('Código válido. Continuar con el proceso.');
      handleCloseModal();
      navigation.navigate('Login');
    } else {
      alert('Por favor, ingrese un código de 5 dígitos.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.containerImgTop}>
          <ImageAtom 
            source={require('../../../assets/logo1.png')}
          />
        </View>
        <View style={styles.containerInfoBottom}>
          <WrapperText 
            title="¡Bienvenido a Faunora!" 
            subtitle="La solución integral para el cuidado de tus animales." 
            styleTitle={styles.customTitle}
          />
          <SubtitleAtom 
            content="Organiza fácilmente la alimentación, los tratamientos y el historial médico de tus mascotas en un solo lugar." 
            style={styles.subtitleStyle}
          />
          <ImageAtom 
            source={require('../../../assets/image 2.png')} 
            style={styles.imageStyleBottom} 
          />
          <WrapperText 
            title="Comienza Ahora" 
            subtitle="Regístrate y lleva el cuidado de tus animales al siguiente nivel."
            styleTitle={styles.customTitle}
          />
          <ButtonAtom
            title="Iniciar sesión"
            onPress={handleOpenModal}
            style={styles.button}
          />
          <ButtonAtom
            title="Registrarse"
            onPress={() => navigation.navigate('Register')}
            style={styles.button}
          />
        </View>
      </View>

      {/* Modal para ingresar el código */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Ingrese el código de 5 dígitos</Text>
            <TextInput
              style={styles.input}
              placeholder="Código"
              keyboardType="numeric"
              maxLength={5}
              value={code}
              onChangeText={setCode}
            />
            <Pressable style={styles.modalButton} onPress={handleSubmitCode}>
              <Text style={styles.modalButtonText}>Validar</Text>
            </Pressable>
            <Pressable style={styles.modalCloseButton} onPress={handleCloseModal}>
              <Text style={styles.modalButtonText}>Cerrar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ACECEE',
  },
  containerImgTop: {
    width: '100%',
    height: '30%',
    alignItems: 'center',
    paddingTop: 50,
  },
  containerInfoBottom: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 40,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  button: {
    width: '100%',
    marginBottom: 25,
  },
  customTitle: {
    color: '#00B4A7',
    textAlign: 'center',
    paddingBottom: 10,
  },
  imageStyleBottom: {
    width: '50%',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    textAlign: 'center',
  },
  modalButton: {
    width: '100%',
    padding: 10,
    backgroundColor: '#00B4A7',
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalCloseButton: {
    width: '100%',
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
    alignItems: 'center',
  },
});

export default LandingPage;
