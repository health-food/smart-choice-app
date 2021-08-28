import * as React from 'react';
import {ScrollView, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {useTheme} from 'react-navigation';
import {Card, Title, Paragraph, Button, Checkbox} from 'react-native-paper';
import {Background} from "../../components/Background";
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/AntDesign';
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const OverviewRoute = ({barcode,found, baseComponent, carbs, fats, proteins, calories}: any) => {
    const [calorieValue, setCalorieValue]: [number | undefined, any] = useState();
    const [carbsValue, setCarbsValue]: [number | undefined, any] = useState();
    const [fatsValue, setFatsValue]: [number | undefined, any] = useState();
    const [proteinsValue, setProteinsValue]: [number | undefined, any] = useState();
    const [chosenList, setChosenList]: any = useState([]);
    const [good, setGoods]: any = useState([]);
    const [bad, setBad]: any = useState([]);

    const getData = async () => {
        try {
            await AsyncStorage.getItem('calories', (errs, result) => {
                if (result) {
                    setCalorieValue(parseInt(result));
                    setProteinsValue(Math.floor(parseInt(result) * 0.3 / 4));
                    setFatsValue(Math.floor(parseInt(result) * 0.3 / 9));
                    setCarbsValue(Math.floor(parseInt(result) * 0.4 / 4));
                } else {
                    setCalorieValue(2000);
                    setProteinsValue(150);
                    setFatsValue(67);
                    setCarbsValue(200);
                }
            });
            await AsyncStorage.getItem('chosen_options', (errs, result) => {
                if (result) {
                    setChosenList(result?.split(',').map(x => +x));
                }
            })
        } catch (e) {
            console.log(e);
            // error reading value
        }
    };

    useEffect(() => {
        getData();
        setGoods(baseComponent.filter((component: any) => component.component.type === 'GOOD'));
        setBad(baseComponent.filter((component: any) => component.component.type === 'BAD'));
    }, []);

    return (
        <View style={{
            flex: 1,
            backgroundColor: '#ffffff',
            borderRadius: 10,
            marginRight: 24,
            marginLeft: 24,
            marginTop: 18,
        }}>
            <ScrollView style={{display: "flex", flexDirection: "column", left: 8, top: 8}}>
                {
                    good.filter((goodItem: any) => !chosenList.includes(goodItem.component.component_id))?.map((item: any) =>
                        <View style={{display: "flex", flexDirection: "row", alignItems: "center", width: '80%'}}>
                            <Checkbox.IOS status={'checked'}
                                          color={'#41d773'}
                            />
                            <Paragraph>{item?.component?.component_name}</Paragraph>
                        </View>
                    )
                }
                {fatsValue && fats / fatsValue < 0.07 &&
                        <View style={{display: "flex", flexDirection: "row", alignItems: "center", width: '80%'}}>
                            <Checkbox.IOS status={'checked'}
                                          color={'#41d773'}
                            />
                            <Paragraph>Пониженное содержание жиров</Paragraph>
                        </View>
                }
                {proteinsValue && proteins / proteinsValue >= 0.05 &&
                <View style={{display: "flex", flexDirection: "row", alignItems: "center", width: '80%'}}>
                    <Checkbox.IOS status={'checked'}
                                  color={'#41d773'}
                    />
                    <Paragraph>Наличие белка</Paragraph>
                </View>
                }
                {calories < 40 &&
                <View style={{display: "flex", flexDirection: "row", alignItems: "center", width: '80%'}}>
                    <Checkbox.IOS status={'checked'}
                                  color={'#41d773'}
                    />
                    <Paragraph>Пониженное содержание калорий</Paragraph>
                </View>
                }
                {
                    bad?.map((item: any) =>
                        <View style={{display: "flex", flexDirection: "row", alignItems: "center", width: '80%', marginTop: 4}}>
                            <Icon name={'close'} size={23} color={'#d74146'} style={{marginRight: 6, marginLeft: 6}}/>
                            <Paragraph>{item?.component?.component_name}</Paragraph>
                        </View>
                    )
                }
                {
                    found?.map((item: any) =>
                        <View style={{display: "flex", flexDirection: "row", alignItems: "center", width: '80%', marginTop: 4}}>
                            <Icon name={'close'} size={23} color={'#d74146'} style={{marginRight: 6, marginLeft: 6}}/>
                            <Paragraph>{item?.component?.component_name}</Paragraph>
                        </View>
                    )
                }
                {
                    fatsValue && fats / fatsValue >= 0.2 &&
                        <View style={{display: "flex", flexDirection: "row", alignItems: "center", width: '80%', marginTop: 4}}>
                            <Icon name={'close'} size={23} color={'#d74146'} style={{marginRight: 6, marginLeft: 6}}/>
                            <Paragraph>Повышенное содержание жиров</Paragraph>
                        </View>
                }
            </ScrollView>
            {/*<View style={{display: "flex", flexDirection: "column"}}>*/}
            {/*    {*/}
            {/*        bad.list.map(item =>*/}
            {/*            <View style={{display: "flex", flexDirection: "row", alignItems: "center", width: '60%'}}>*/}
            {/*                <Icon name={'close'} size={23} color={'#d74146'} style={{marginRight: 6}}/>*/}
            {/*                <Paragraph>{item}</Paragraph>*/}
            {/*            </View>*/}
            {/*        )*/}
            {/*    }*/}
            {/*</View>*/}
        </View>
    )
}
;