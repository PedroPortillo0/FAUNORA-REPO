import React from 'react';
import { Image, StyleSheet } from 'react-native';

const ImageAtom = ({ source, style }) => {
  return <Image source={source} style={[styles.image, style]} resizeMode="contain" />;
};

const styles = StyleSheet.create({
  image: {
    width: '100%', // Ajusta el tamaño según tus necesidades
    height: 200,   // Altura de la imagen
  },
});

export default ImageAtom;
