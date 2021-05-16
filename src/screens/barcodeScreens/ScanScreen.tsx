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
    title: 'Поиск по штрихкоду',
    headerStyle: {
        backgroundColor: '#F5FAFA',
        borderColor: '#F5FAFA',
        shadowRadius: 0,
        shadowOffset: {
            height: 0,
        },
    },
}