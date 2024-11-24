import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from '../atoms/Icon';
import TextLabel from '../atoms/Text';

const NavbarOption = ({ iconName, label, onPress, iconColor, labelColor }) => {
    return (
        <TouchableOpacity onPress={onPress} style={{ alignItems: 'center' }}>
            <Icon name={iconName} color={iconColor} />
            <TextLabel color={labelColor}>{label}</TextLabel>
        </TouchableOpacity>
    );
};

export default NavbarOption;
