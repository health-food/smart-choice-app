import { createBottomTabNavigator } from 'react-navigation-tabs';
// navigation stacks
import ProfileStack from './ProfileStack';
import colors from "../constants/colors";
import SearchStack from "./SearchStack";
import ScanStack from "./ScanStack";
import FavoritesStack from "./FavoritesStack";
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
    shadow: {
        shadowColor: 'rgba(107, 107, 107, 0.15)',
        shadowOffset: {
            width: 0,
            height: -5,
        },
        shadowOpacity: 0.55,
        shadowRadius: 3.5,
        elevation: 5,
    },
});

const BottomTabNavigator = createBottomTabNavigator(
    {
        SearchStack,
        ScanStack,
        FavoritesStack,
        ProfileStack,
    },
    {
        initialRouteName: 'ScanStack',
        tabBarOptions: {
            activeTintColor: colors.activeTintColor["light"],
            inactiveTintColor: {
                light: colors.grey,
                dark: colors.white20,
            },
            style: {
                position: "absolute",
                borderRadius: 25,
                height: 80,
                backgroundColor: '#ffffff',
                ...styles.shadow,
            },
        },
    }
);

export default BottomTabNavigator;