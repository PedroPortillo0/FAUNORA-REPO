// InputFieldMolecule.js
import React from 'react';
import { View, StyleSheet } from 'react-native';

const InputFieldMolecule = ({ icon, input, actionIcon }) => {
  return (
    <View style={styles.container}>
      {icon} {/* Icono a la izquierda */}
      {input} {/* Campo de entrada */}
      {actionIcon} {/* Icono de acción a la derecha */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
});

export default InputFieldMolecule;
