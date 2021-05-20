import * as React from 'react';
import {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {useTheme} from 'react-navigation';
import {Button, Card, Title} from 'react-native-paper';
import {TabBar, TabView} from 'react-native-tab-view';
import {OverviewRoute} from "./OverviewRoute";
import {DetailsRoute} from "./DetailsRoute";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";

export const FavButton = ({ a }: any) => {
    // console.log(a);
    const [chosenList, setChosenList]: any = useState([]);
    const [favorites, setFavorites]: any = useState([]);
    const [isFav, setIsFav]: any = useState(false);

    // const getData = async () => {
    //     try {
    //         await AsyncStorage.getItem('favorites', (errs, result) => {
    //             if (result !== null) {
    //                 const favs: any[] = result?.split(',').map(x => +x) || [];
    //                 setFavorites(favs);
    //                 setIsFav(!!favs.find((barCode: any) => barCode === navigation.state.params));
    //             }
    //         })
    //     } catch (e) {
    //         console.log(e);
    //         // error reading value
    //     }
    // };
    //
    // const onFavClick = async () => {
    //     setIsFav(!isFav);
    //     if (isFav) {
    //         const favs = favorites.filter((barCode: number) => barCode !== navigation.state.params);
    //         setFavorites(favs);
    //         await AsyncStorage.setItem('favorites', favs.join(','));
    //     } else {
    //         setFavorites([...favorites, navigation.state.params]);
    //         await AsyncStorage.setItem('favorites', [...favorites, navigation.state.params].join(','));
    //     }
    // };
    //
    // useEffect(() => {
    //     getData();
    // }, [navigation.state.params]);

    return (
        <Button style={{width: 20}}>
            <Icon name={'bookmark'} size={26} style={{display: 'flex',}} color={isFav ? '#4eae14' : '#c1c1c1'}/>
        </Button>
    );
};

const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    card: {
        marginRight: 8,
        marginLeft: 8,
    },
    header: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    image: {
        width: 150,
        height: 150,
        marginBottom: 8,
        marginRight: 12,
    },
})