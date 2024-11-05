import React from 'react';
import { View, StyleSheet } from 'react-native';
import TitleAtom from '../atoms/TitleAtom';
import SubtitleAtom from '../atoms/SubtitleAtom';

const WrapperText = ({ title, subtitle, styleTitle }) => {
  return (
    <View style={styles.container}>
      <TitleAtom content={title} style={styleTitle} />
      <SubtitleAtom content={subtitle} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center', // Centra horizontalmente
    marginBottom: 20,
  },
});

export default WrapperText;
