import React from 'react';
import { Text, StyleSheet } from 'react-native';

const SubtitleAtom = ({ content, style }) => {
  return <Text style={[styles.subtitle, style]}>{content}</Text>;
};

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center', // Centra el texto
  },
});

export default SubtitleAtom;
