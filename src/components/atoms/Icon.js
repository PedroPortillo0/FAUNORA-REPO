import React from 'react';
import { Ionicons } from '@expo/vector-icons';

const Icon = ({ name, size = 24, color = '#A0A0A0' }) => {
    return <Ionicons name={name} size={size} color={color} />;
};

export default Icon;
