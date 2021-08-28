import {StyleSheet, Text, View} from "react-native";
import * as React from "react";
import ProgressCircle from 'react-native-progress-circle';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useEffect, useState} from "react";
import {ProgressBar, Colors} from 'react-native-paper';
import {ProgressBarComponent} from "./ProgressBarComponent";

export const DetailsRoute = ({carbs, fats, proteins, calories, weight}: any) => {
    const [calorieValue, setCalorieValue]: [number, any] = useState(2000);
    const [carbsValue, setCarbsValue]: [number, any] = useState(200);
    const [fatsValue, setFatsValue]: [number | undefined, any] = useState(67);
    const [proteinsValue, setProteinsValue]: [number | undefined, any] = useState(150);
    const [chosenList, setChosenList]: any = useState([]);

    const getData = async () => {
        try {
            await AsyncStorage.getItem('calories', (errs, result) => {
                if (result) {
                    setCalorieValue(parseInt(result));
                    setProteinsValue(Math.floor(parseInt(result) * 0.3 / 4));
                    setFatsValue(Math.floor(parseInt(result) * 0.3 / 9));
                    setCarbsValue(Math.floor(parseInt(result) * 0.4 / 4));
                }
            });
            await AsyncStorage.getItem('chosen_options', (errs, result) => {
                if (result) {
                    setChosenList(result?.split(',').map(x => +x) );
                }
            })
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <View style={{
            flex: 1,
        }}>
            <View style={styles.calorieCard}>
                <View style={{display: "flex", flexDirection: "row", marginTop: 24,}}>
                    <Text style={styles.calorieHeader}>Энергетическая ценность</Text>
                    <Text style={styles.calorieValue}>{calories} Ккал</Text>
                </View>
                <ProgressBarComponent name={'Белки'}
                                      value={proteins}
                                      percentage={proteins / proteinsValue}
                                      color={'#62CB8E'}
                                      backgroundColor={'#E6FAE1'}/>
                <ProgressBarComponent name={'Жиры'}
                                      value={fats}
                                      percentage={fats / fatsValue}
                                      color={'#71CBE5'}
                                      backgroundColor={'#E1F4FA'}/>
                <ProgressBarComponent name={'Углеводы'}
                                      value={carbs}
                                      percentage={carbs / carbsValue}
                                      color={'#20AF40'}
                                      backgroundColor={'#E6FAE1'}/>
                                      <Text style={styles.valueInfo}>От суточной нормы</Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: '#F5FAFA',
    },
    calorieCard: {
        backgroundColor: '#ffffff',
        display: 'flex',
        marginLeft: 24,
        marginRight: 24,
        marginTop: 18,
        borderRadius: 10,
        height: 260,
    },
    calorieHeader: {
        color: '#2E2E2E',
        fontWeight: '600',
        fontSize: 14,
        letterSpacing: -0.24,
        marginLeft: 8,
    },
    calorieValue: {
        color: '#A8A8A8',
        fontSize: 14,
        lineHeight: 22,
        fontWeight: '600',
        marginLeft: 14,
    },
    valueInfo: {
        color: '#A8A8A8',
        fontSize: 12,
        fontWeight: '600',
        textAlign: "right",
        right: 8,
        top: 8,
    },
})