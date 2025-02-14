import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { MenuOption } from 'react-native-popup-menu';

const MenuItem = ({ text, action, value, icon }) => {
    return (
        <MenuOption onSelect={() => action(value)}>
            <View style={styles.menuItemContainer}>
                <Text>{text}</Text>
                {icon}
            </View>
        </MenuOption>
    );
};

const styles = StyleSheet.create({
    menuItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16, // Эквивалент px-4 в Tailwind
        paddingVertical: 4,   // Эквивалент py-1 в Tailwind
    },
    iconText: {
        // Стили для иконки, если необходимо
    },
    menuText: {
        // Стили для текста, если необходимо
    },
});

export default MenuItem;