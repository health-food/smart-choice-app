import * as React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from "react-native";
import {Paragraph, Snackbar} from "react-native-paper";
import {useEffect, useState} from "react";
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/AntDesign';
import {TextInput} from 'react-native';
import {Button} from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {HeightWeightInput} from "./HeightWeightInput";
import {GenderRadioButton} from "./GenderRadioButton";
import SvgAvatar from "./Svg.Avatar";

export const ProfileSettingsScreen = () => {
    const [name, setName]: [string, any] = useState('');
    const [gender, setGender]: [string, any] = useState('');
    const [age, setAge]: [string, any] = useState('');
    const [height, setHeight]: [string, any] = useState('')
    const [weight, setWeight]: [string, any] = useState('');
    const [focused, setFocused]: any = useState('');
    const [visible, setVisible] = React.useState(false);

    const onToggleSnackBar = () => setVisible(!visible);

    const onDismissSnackBar = () => setVisible(false);

    const onSaveClick = async () => {
        try {
            if (name) {
                await AsyncStorage.setItem('name', name)
            }
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
            setVisible(true);
        } catch (e) {
            // saving error
        }
    };

    const getData = async () => {
        try {
            await AsyncStorage.getItem('name', (errs, result) => {
                if (result !== null) {
                    setName(result);
                }
            })
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
        <View style={styles.view}>
            <ScrollView style={styles.scrollview}>
                <View
                    style={styles.profileImage}
                >
                    <SvgAvatar/>
                </View>
                {/*<RNPickerSelect*/}
                {/*    style={pickerStyles}*/}
                {/*    placeholder={{label: "Укажите пол", value: null}}*/}
                {/*    items={[*/}
                {/*        {label: 'Мужской', value: 'male'},*/}
                {/*        {label: 'Женский', value: 'female'}*/}
                {/*    ]}*/}
                {/*    onValueChange={value => {*/}
                {/*        setGender(value);*/}
                {/*    }}*/}
                {/*    value={gender}*/}
                {/*    Icon={() => <Icon name={'down'}/>}*/}
                {/*/>*/}
                <Text style={{fontSize: 14, color: '#4E4E53', marginBottom: 4,}}>Имя</Text>
                <TextInput
                    style={{
                        marginBottom: 28,
                        width: '100%',
                        borderRadius: 4,
                        height: 48,
                        borderWidth: 1,
                        paddingLeft: 12,
                        fontSize: 16, borderColor: focused === 'name' ? '#20AF40' : '#D1CFD7'
                    }}
                    value={name}
                    onChangeText={text => setName(text)}
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused('')}
                />
                <Text style={{fontSize: 14, color: '#4E4E53', marginBottom: 4,}}>Возраст</Text>
                <TextInput
                    style={{
                        marginBottom: 28,
                        width: '100%',
                        borderRadius: 4,
                        height: 48,
                        borderWidth: 1,
                        paddingLeft: 12,
                        fontSize: 16, borderColor: focused === 'age' ? '#20AF40' : '#D1CFD7'
                    }}
                    value={age}
                    keyboardType={'number-pad'}
                    onChangeText={text => setAge(text)}
                    onFocus={() => setFocused('age')}
                    onBlur={() => setFocused('')}
                />
                <View style={{display: "flex", flexDirection: 'row', justifyContent: "space-between"}}>
                    <HeightWeightInput value={height} onChangeText={(text: any) => setHeight(text)} title={'Рост'}/>
                    <HeightWeightInput value={weight} onChangeText={(text: any) => setWeight(text)} title={'Вес'}/>
                </View>
                <Text style={{marginTop: 18, marginBottom: 4,}}>Пол</Text>
                <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between",}}>
                    <GenderRadioButton onClick={() => setGender('female')} chosen={gender === 'female'}
                                       name={'Женский'}/>
                    <GenderRadioButton onClick={() => setGender('male')} chosen={gender === 'male'} name={'Мужской'}/>
                </View>
                <Button mode={'contained'}
                        style={styles.save} labelStyle={{fontSize: 16,}} uppercase={false}
                        onPress={onSaveClick}>
                    Сохранить
                </Button>
                <Snackbar
                    visible={visible} duration={500} style={{backgroundColor: '#F5FAFA'}}
                    onDismiss={onDismissSnackBar}
                    >
                    <Text style={{color: '#20AF40'}}>Успешно сохранено!</Text>
                </Snackbar>
            </ScrollView>
        </View>
    )
};

ProfileSettingsScreen.navigationOptions = {
    title: '',
    headerStyle: {
        backgroundColor: '#FFFFFF',
        borderColor: '#FFFFFF',
        shadowRadius: 0,
        shadowOffset: {
            height: 0,
        },
    },
}


const styles = StyleSheet.create({
    view: {
        backgroundColor: '#ffffff',
        height: '100%'
    },
    scrollview: {
        marginRight: '5%',
        marginTop: 15,
        marginLeft: '5%',
    },
    profileImage: {
        borderColor: '#fff',
        overflow: "hidden",
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 15,
    },
    save: {
        backgroundColor: '#20AF40',
        width: 160,
        height: 44,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 28,
        borderRadius: 10,
        marginBottom: 70,
    }
});