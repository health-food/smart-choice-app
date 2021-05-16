import {Text, View} from "react-native";
import * as React from "react";
import ProgressCircle from 'react-native-progress-circle';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useEffect, useState} from "react";

export const DetailsRoute = ({carbs, fats, proteins, calories, weight}: any) => {
    const [calorieValue, setCalorieValue]: [number, any] = useState(2000);
    const [carbsValue, setCarbsValue]: [number, any] = useState(200);
    const [fatsValue, setFatsValue]: [number | undefined, any] = useState(67);
    const [proteinsValue, setProteinsValue]: [number | undefined, any] = useState(150);
    const [chosenList, setChosenList]: any = useState([]);

    const getData = async () => {
        try {
            await AsyncStorage.getItem('calories', (errs, result) => {
                if (result !== undefined) {
                    setCalorieValue(parseInt(result));
                    setProteinsValue(Math.floor(parseInt(result) * 0.3 / 4));
                    setFatsValue(Math.floor(parseInt(result) * 0.3 / 9));
                    setCarbsValue(Math.floor(parseInt(result) * 0.4 / 4));
                }
            });
            await AsyncStorage.getItem('chosen_options', (errs, result) => {
                // console.log(result);
                if (result !== null) {
                    setChosenList(result ? result?.split(',').map(x => +x) : []);
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
        <View style={{
            flex: 1,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            top: 25,
            marginLeft: 14,
            marginRight: 14,
        }}>
            <View style={{display: 'flex', flexDirection: "column", alignItems: "center"}}>
                <Text>Белки</Text>
                <ProgressCircle
                    percent={proteins * 100 / proteinsValue}
                    radius={50}
                    borderWidth={8}
                    color="#3399FF"
                    shadowColor="#999"
                    bgColor="#fff"
                >
                    <Text style={{fontSize: 18}}>{`${Math.floor(proteins * 100 / proteinsValue)}%`}</Text>
                </ProgressCircle>
            </View>
            <View style={{display: 'flex', flexDirection: "column", alignItems: "center"}}>
                <Text>Жиры</Text>
                <ProgressCircle
                    percent={fats * 100 / fatsValue}
                    radius={50}
                    borderWidth={8}
                    color="#3399FF"
                    shadowColor="#999"
                    bgColor="#fff"
                >
                    <Text style={{fontSize: 18}}>{`${Math.floor(fats * 100 / fatsValue)}%`}</Text>
                </ProgressCircle>
            </View>
            <View style={{display: 'flex', flexDirection: "column", alignItems: "center"}}>
                <Text>Углеводы</Text>
                <ProgressCircle
                    percent={carbs * 100 / carbsValue}
                    radius={50}
                    borderWidth={8}
                    color="#3399FF"
                    shadowColor="#999"
                    bgColor="#fff"
                >
                    <Text style={{fontSize: 18}}>{`${Math.floor(carbs * 100 / carbsValue)}%`}</Text>
                </ProgressCircle>
            </View>
        </View>
    )
};