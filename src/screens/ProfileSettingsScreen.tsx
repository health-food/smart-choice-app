import * as React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from "react-native";
import {Paragraph} from "react-native-paper";
import {useEffect, useState} from "react";
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/AntDesign';
import {TextInput} from 'react-native-paper';
import {Button} from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ProfileSettingsScreen = () => {
    const [gender, setGender]: [string, any] = useState('');
    const [age, setAge]: [string, any] = useState('');
    const [height, setHeight]: [string, any] = useState('')
    const [weight, setWeight]: [string, any] = useState('');

    const onSaveClick = async () => {
        try {
            if (gender) {
                await AsyncStorage.setItem('gender', gender)
            }
            if (age) {
                await AsyncStorage.setItem('age', age)
            }
            if (height) {
                await AsyncStorage.setItem('height', height)
            }
            if (weight) {
                await AsyncStorage.setItem('weight', weight)
            }
            const calories = gender === 'male'
                ? (88.362 + (13.397 * parseInt(weight)) + (4.799 * parseInt(height)) - (5.677 * parseInt(age))) * 1.2
                : (447.593 + (9.247 * parseInt(weight)) + (3.098 * parseInt(height)) - (4.330 * parseInt(age))) * 1.2;
            if (calories) {
                await AsyncStorage.setItem('calories', Math.floor(calories).toString());
            }
        } catch (e) {
            // saving error
        }
    };

    const getData = async () => {
        try {
            await AsyncStorage.getItem('gender', (errs, result) => {
                if (result !== null) {
                    setGender(result);
                }
            })
            await AsyncStorage.getItem('age', (errs, result) => {
                if (result !== null) {
                    setAge(result);
                }
            })
            await AsyncStorage.getItem('height', (errs, result) => {
                if (result !== null) {
                    setHeight(result);
                }
            })
            await AsyncStorage.getItem('weight', (errs, result) => {
                if (result !== null) {
                    setWeight(result);
                }
            })
        } catch (e) {
            console.log(e);
            // error reading value
        }
    };

    useEffect(() => {
        getData();
    }, []);


    return (
        <ScrollView style={styles.view}>
            <Image
                source={{uri: 'data:image/jpeg;base64,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'}}
                style={styles.profileImage}
            />
            <RNPickerSelect
                style={pickerStyles}
                placeholder={{label: "Укажите пол", value: null}}
                items={[
                    {label: 'Мужской', value: 'male'},
                    {label: 'Женский', value: 'female'}
                ]}
                onValueChange={value => {
                    setGender(value);
                }}
                value={gender}
                Icon={() => <Icon name={'down'}/>}
            />
            <TextInput
                mode={'outlined'}
                style={{marginBottom: 15}}
                label="Возраст"
                value={age}
                keyboardType={'number-pad'}
                onChangeText={text => setAge(text)}
            />
            <TextInput mode={'outlined'}
                       style={{marginBottom: 15}}
                       label="Вес в кг"
                       value={weight}
                       keyboardType={'number-pad'}
                       onChangeText={text => setWeight(text)}
            />
            <TextInput mode={'outlined'}
                       style={{marginBottom: 15}}
                       label="Рост в см"
                       value={height}
                       keyboardType={'number-pad'}
                       onChangeText={text => setHeight(text)}
            />
            <Button icon={'content-save'} mode={'contained'}
                    style={{width: 150, marginLeft: 'auto', marginRight: 'auto'}}
                    onPress={onSaveClick}>
                Сохранить
            </Button>
        </ScrollView>
    )
};

ProfileSettingsScreen.navigationOptions = {
    title: 'Настройки профиля',
    headerStyle: {
        backgroundColor: '#F5FAFA',
        borderColor: '#F5FAFA',
        shadowRadius: 0,
        shadowOffset: {
            height: 0,
        },
    },
}


const styles = StyleSheet.create({
    view: {
        marginRight: 15,
        marginTop: 15,
        marginLeft: 15,
    },
    profileImage: {
        width: 95,
        height: 95,
        borderRadius: 75,
        borderColor: '#fff',
        borderWidth: 2,
        overflow: "hidden",
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 15,
    },
})

const pickerStyles = StyleSheet.create({
    iconContainer: {
        top: 25,
        right: 15,
    },
    inputIOS: {
        fontSize: 14,
        paddingVertical: 20,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#ababab',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
        marginBottom: 15,
    },
    inputAndroid: {
        fontSize: 14,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: 'blue',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
        marginBottom: 15,
    },
})