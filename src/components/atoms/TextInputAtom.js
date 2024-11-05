import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const TextInputAtom = ({ placeholder, secureTextEntry, onChangeText, value, style, ...props }) => {
  return (
    <TextInput
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      onChangeText={onChangeText}
      value={value}
      style={[styles.input, style]} // Aplica estilos
      {...props} // Permite pasar otras props
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
  },
});

export default TextInputAtom;
