import React from 'react';
import { Text, StyleSheet } from 'react-native';

const TextLabel = ({ children, style, color }) => {
    return <Text style={[styles.baseText, style, { color }]}>{children}</Text>;
};

const styles = StyleSheet.create({
    baseText: {
        fontSize: 12,
        color: '#A0A0A0', // color por defecto
    },
});

export default TextLabel;
