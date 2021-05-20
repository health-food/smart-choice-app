import {StyleSheet, Text, View} from "react-native";
import {TextInput} from "react-native";
import * as React from "react";
import {useState} from "react";

export const HeightWeightInput = ({value, onChangeText, title}: any) => {
    const [focused, setFocused]: any = useState(false);

    return (
        <View style={{display: "flex", flexDirection: "row"}}>
            <View style={{display: "flex", flexDirection: "column"}}>
                <Text style={{fontSize: 14, color: '#4E4E53', marginBottom: 4,}}>{title}</Text>
                <TextInput style={[styles.input, { borderColor: focused ? '#20AF40' : '#D1CFD7' }]}
                           value={value}
                           keyboardType={'number-pad'}
                           onChangeText={onChangeText}
                           onFocus={() => setFocused(true)}
                           onBlur={() => setFocused(false)}
                />
            </View>
            <Text style={{top: 45, height: 22, marginLeft: 8, color: '#4E4E53'}}>{title === 'Рост' ? 'см' : 'кг'}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    input: {
        marginBottom: 15,
        height: 48,
        width: 150,
        borderRadius: 4,
        borderWidth: 1,
        paddingLeft: 12,
        fontSize: 16,
    },
})
