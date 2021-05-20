import * as React from 'react';
import {ScrollView, StyleSheet, View, Text, TouchableHighlight} from "react-native";

export const GenderRadioButton = ({chosen, name, onClick}: any) => {
    return (
        <TouchableHighlight onPress={onClick} underlayColor={'#fff'}>
            <View style={style.form}>
                <View style={chosen ? style.chosen : style.notChosen}/>
                <Text style={style.name}>{name}</Text>
            </View>
        </TouchableHighlight>
    )
};

const style = StyleSheet.create({
    form: {
        height: 48,
        width: 170,
        borderRadius: 4,
        borderWidth: 1,
        paddingLeft: 12,
        borderColor: '#D1CFD7',
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    chosen: {
        backgroundColor: '#ffffff',
        borderWidth: 7,
        borderColor: '#20AF40',
        width: 24,
        height: 24,
        borderRadius: 50,
    },
    notChosen: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#D1CFD7',
        width: 24,
        height: 24,
        borderRadius: 50,
    },
    name: {
        marginLeft: 8,
        fontSize: 16,
    }
})