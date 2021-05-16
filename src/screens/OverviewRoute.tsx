import * as React from 'react';
import {ScrollView, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {useTheme} from 'react-navigation';
import {Card, Title, Paragraph, Button, Checkbox} from 'react-native-paper';
import {Background} from "../components/Background";
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/AntDesign';

export const OverviewRoute = ({barcode}: any) => {
    const good = barcode === 4607065714116 ? {
        key: 'good',
        list: ['Низкое содержание жира', 'Низкий уровень холестерина', 'Мало калорий'],
    } : {
        key: 'good',
        list: ['Низкий уровень холестерина', 'Низкое содержание насыщенных жиров'],
    };
    const bad = barcode === 4607065714116 ? {key: 'bad', list: []} :{
        key: 'bad',
        list: ['Добавленный сахар']
    };

    return (
        <View style={{flex: 1, display: "flex", flexDirection: "row", justifyContent: "space-around", marginTop: 12,}}>
            <View style={{display: "flex", flexDirection: "column"}}>
                {
                    good.list.map(item =>
                        <View style={{display: "flex", flexDirection: "row", alignItems: "center", width: '60%'}}>
                            <Checkbox.IOS status={'checked'}
                                          color={'#41d773'}
                            />
                            <Paragraph>{item}</Paragraph>
                        </View>
                    )
                }
            </View>
            <View style={{display: "flex", flexDirection: "column"}}>
                {
                    bad.list.map(item =>
                        <View style={{display: "flex", flexDirection: "row", alignItems: "center", width: '60%'}}>
                            <Icon name={'close'} size={23} color={'#d74146'} style={{marginRight: 6}}/>
                            <Paragraph>{item}</Paragraph>
                        </View>
                    )
                }
            </View>
        </View>
    )
};