import React from 'react';
import { Text, StyleSheet } from 'react-native';

const TitleAtom = ({ content, style }) => {
  return <Text style={[styles.title, style]}>{content}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default TitleAtom;
