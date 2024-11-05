import React from 'react';
import { View, StyleSheet } from 'react-native';
import ButtonAtom from '../../components/atoms/ButtonAtom';
import ImageAtom from '../../components/atoms/ImageAtom';
import WrapperText from '../../components/molecules/WrapperText'; 
import SubtitleAtom from '../../components/atoms/SubtitleAtom';

const LandingPage = ({ navigation }) => {
  return (
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
          styleTitle={styles.customTitle} // Aplica el estilo al título
        />
        <SubtitleAtom 
          content="Organiza fácilmente la alimentación, los tratamientos y el historial médico de tus mascotas en un solo lugar." 
          style={styles.subtitleStyle} // Aplica el estilo al subtítulo
        />
        <ImageAtom 
          source={require('../../../assets/image 2.png')} 
          style={styles.imageStyleBottom} 
        />
        <WrapperText 
          title="Comienza Ahora" 
          subtitle="Regístrate y lleva el cuidado de tus animales al siguiente nivel."
          styleTitle={styles.customTitle} // Aplica el estilo al segundo título
        />
        <ButtonAtom
          title="Iniciar sesión"
          onPress={() => navigation.navigate('Login')}
          style={styles.button}
        />
        <ButtonAtom
          title="Registrarse"
          onPress={() => navigation.navigate('Register')}
          style={styles.button}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    paddingTop: 30,
  },
  containerInfoBottom: {
    width: '100%',
    height: '70%', 
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
    paddingBottom: 10, // Añade padding inferior para separar del subtítulo
  },
  imageStyleBottom: {
    width: '50%',
  },
});

export default LandingPage;
