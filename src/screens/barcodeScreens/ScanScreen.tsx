import * as React from 'react';
import { useTheme } from 'react-navigation';
import {BarcodeScan} from "./BarcodeScan";

export const ScanScreen = ({ navigation, screenProps }: any) => {
    const theme = useTheme();

    return (
        <BarcodeScan navigation={navigation} />
    );
};

ScanScreen.navigationOptions = {
    title: 'Сканер штрих-кода',
    headerStyle: {
        backgroundColor: '#FFFFFF',
        borderColor: '#F5FAFA',
        shadowRadius: 0,
        shadowOffset: {
            height: 0,
        },
    },
    headerTintColor: '#20AF40',
    headerTitleStyle: {
        fontSize: 24,
        fontWeight: 'bold',
        letterSpacing: -0.24,
    },
}