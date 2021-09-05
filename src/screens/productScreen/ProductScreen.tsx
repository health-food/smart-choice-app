import * as React from 'react';
import {Image, ScrollView, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {useTheme} from 'react-navigation';
import {Title} from 'react-native-paper';
import {TabBar, TabView} from 'react-native-tab-view';
import {OverviewRoute} from "./OverviewRoute";
import {DetailsRoute} from "./DetailsRoute";
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import SvgAvoid from "../Svg.Avoid";
import Spinner from "../../components/spinner/Spinner";
import {storage} from "../../storage/Storage";

const operationsDoc = `
 query MyQuery($_eq: bigint = "") {
    products(where: {barcode: {_eq: $_eq}}) {
      calories
      carbs
      composition
      fats
      name
      proteins
      product_id
      weight
      preview_image_url
      xref_product_2_components {
      component {
        component_id
        component_name
        type
      }
    }
    }
  }
`;

const IngredientsRoute = ({ingredients}: any) => (
    <ScrollView
        style={{flex: 1, backgroundColor: '#ffffff', marginTop: 18, marginBottom: '30%',
            borderRadius: 10, marginLeft: 24, marginRight: 24}}>
        <Text style={{marginRight: 8, marginLeft: 8, marginTop: 8, fontSize: 15, lineHeight: 18,}}>
            {ingredients}
        </Text>
    </ScrollView>
);

export const ProductScreen = ({navigation, screenProps}: any) => {
    const theme = useTheme();
    const layout = useWindowDimensions();
    const [data, setData]: any = useState();
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        {key: 'first', title: 'Компоненты'},
        {key: 'second', title: 'КБЖУ'},
        {key: 'third', title: 'Состав'},
    ]);
    const [chosenList, setChosenList]: any = useState([]);
    const [favorites, setFavorites]: any = useState([]);
    const [baseComponent, setBaseComponent]: any = useState([]);
    const [isFav, setIsFav]: any = useState(false);
    const [loading, setLoading] = useState(true);

    // const found = data?.xref_product_2_components?.some((r: any) => chosenList?.includes(r?.component?.component_id));
    const found = data?.xref_product_2_components?.filter((r: any) => chosenList?.includes(r?.component?.component_id));

    const renderScene = ({route}: any) => {
        switch (route.key) {
            case 'first':
                return (
                    <OverviewRoute barcode={navigation.state.params} baseComponent={baseComponent}
                                   carbs={data?.carbs}
                                   fats={data?.fats}
                                   proteins={data?.proteins}
                                   calories={data?.calories} found={found}/>
                );
            case 'second':
                return <DetailsRoute carbs={data?.carbs}
                                     fats={data?.fats}
                                     proteins={data?.proteins}
                                     weight={data?.weight}
                                     calories={data?.calories}/>
            case 'third':
                return <IngredientsRoute ingredients={data?.composition}/>
            default:
                return null;
        }
    };

    const renderTabBar = (props: any) => (
        <TabBar activeColor={'#44ae18'} inactiveColor={'#A8A8A8'}
                {...props}
                indicatorStyle={{backgroundColor: '#44ae18'}}
                style={{backgroundColor: '#F5FAFA'}}
                labelStyle={{fontWeight: '600'}}
        />
    );

    const getData = async () => {
        try {
            storage.getChosenComponents().then(chosenComponents => setChosenList(chosenComponents));
            await AsyncStorage.getItem('favorites', (errs, result) => {
                if (result !== null) {
                    const favs: any[] = result?.split(',').map(x => +x) || [];
                    setFavorites(favs);
                    setIsFav(!!favs.find((barCode: any) => barCode === navigation.state.params));
                }
            })
        } catch (e) {
            console.error(e);
            // error reading value
        }
    };

    const onFavClick = async () => {
        setIsFav(!isFav);
        if (isFav) {
            const favs = favorites.filter((barCode: number) => barCode !== navigation.state.params);
            setFavorites(favs);
            await AsyncStorage.setItem('favorites', favs.join(','));
        } else {
            setFavorites([...favorites, navigation.state.params]);
            await AsyncStorage.setItem('favorites', [...favorites, navigation.state.params].join(','));
        }
    };

    useEffect(() => {
        getData();
        fetch(
            "http://64.225.106.248/v1/graphql",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'x-hasura-admin-secret': 'rj0PaUGIirrkaOJu034H',
                },
                body: JSON.stringify({
                    query: operationsDoc,
                    variables: {"_eq": navigation.state.params},
                    operationName: 'MyQuery'
                })
            }
        )
            .then((response) => response.json())
            .then((json) => json.data)
            .then((response) => {
                setData(response?.products[0]);
                setBaseComponent(response?.products[0]?.xref_product_2_components.filter((component:any) => component?.component.type !== 'ALLERGEN'));
            })
            .catch((error) => console.error('2', error))
            .finally(()=> setLoading(false))
    }, [navigation.state.params]);

    useEffect(() => {
        const didFocusSubscription = navigation.addListener(
            'didFocus',
            (payload: any) => {
                getData();
            }
        );
        return () => didFocusSubscription.remove();
    }, []);

    if (loading) {
        return <View style={{backgroundColor: '#F5FAFA', height: '100%', justifyContent: "center"}}>
            <Spinner color={'#91bf91'} size={400}/>
        </View>
    }

    return (
        <View style={styles.view}>
            <View style={styles.card}>
                <Title style={{
                    maxWidth: '100%',
                    fontSize: 18,
                    marginLeft: 8,
                    marginRight: 8,
                    fontWeight: "bold",
                    textAlign: "center"
                }}>{data?.name}</Title>
                {found?.length !== 0 && <View style={styles.avoid}>
                    <SvgAvoid/>
                    <Text style={{color: '#FE6F1C', fontSize: 16, fontWeight: "bold",}}>НЕ РЕКОМЕНДОВАНО</Text>
                </View>
                }
                <View style={{
                    display: "flex",
                    marginTop: 14,
                    marginBottom: 20,
                    flexDirection: "row",
                    // justifyContent: "center",
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    alignItems: "flex-start"
                }}>
                    <Image source={{uri: data?.preview_image_url}}
                           style={styles.image}/>
                    <Button onPress={onFavClick} style={{width: 20, right: 6, top: -14,}}>
                        <Icon name={'bookmark'} size={26} style={{display: 'flex'}}
                              color={isFav ? '#4eae14' : '#c1c1c1'}/>
                    </Button>
                </View>
            </View>
            <TabView renderTabBar={renderTabBar}
                     navigationState={{index, routes}}
                     renderScene={renderScene}
                     onIndexChange={setIndex}
                     initialLayout={{width: layout.width}}
            />
        </View>
    );
};

ProductScreen.navigationOptions = {
    title: '',
    headerStyle: {
        backgroundColor: '#F5FAFA',
        borderColor: '#F5FAFA',
        shadowRadius: 0,
        shadowOffset: {
            height: 0,
        },
    },
    headerTintColor: '#4E4E53',
    headerBackTitleVisible: false,
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: '#F5FAFA',
    },
    card: {},
    header: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    image: {
        width: 170,
        height: 170,
        left: '15%',
        borderRadius: 10,
    },
    avoid: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",

    }
})