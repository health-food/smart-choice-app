import * as React from 'react';
import {Image, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {useTheme} from 'react-navigation';
import {Card, Title} from 'react-native-paper';
import {Background} from "../components/Background";
import {TabBar, TabView} from 'react-native-tab-view';
import {OverviewRoute} from "./OverviewRoute";
import {DetailsRoute} from "./DetailsRoute";
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

const operationsDoc = `
 query MyQuery($_eq: bigint = "") {
    products(where: {barcode: {_eq: $_eq}}) {
      calories
      carbs
      composition
      description
      fats
      name
      proteins
      storage_conditions_info
      product_id
      weight
      preview_image_url
      xref_product_2_components {
      component {
        component_id
        component_name
      }
    }
    }
  }
`;

const IngredientsRoute = ({ingredients}: any) => (
    <View style={{flex: 1,}}>
        <Text>
            {ingredients}
        </Text>
    </View>
);

export const ProductScreen = ({navigation, screenProps}: any) => {
    const theme = useTheme();
    const layout = useWindowDimensions();
    const [data, setData]: any = useState({
        calories: '',
        carbs: '',
        composition: [],
        description: '',
        fats: '',
        name: '',
        proteins: '',
        storage_conditions_info: '',
        weight: '',
        preview_image_url: '',
        xref_product_2_components: [],
        product_id: undefined,
    });
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        {key: 'first', title: 'Overview'},
        {key: 'second', title: 'Details'},
        {key: 'third', title: 'Ingredients'},
    ]);
    const [chosenList, setChosenList]: any = useState([]);
    const [favorites, setFavorites]: any = useState([]);
    const [isFav, setIsFav]: any = useState(false);

    const renderScene = ({route}: any) => {
        switch (route.key) {
            case 'first':
                return (
                    <OverviewRoute barcode={navigation.state.params}/>
                );
            case 'second':
                return <DetailsRoute carbs={data.carbs}
                                     fats={data.fats}
                                     proteins={data.proteins}
                                     weight={data.weight}
                                     calories={data.calories}/>
            case 'third':
                return <IngredientsRoute ingredients={data.composition.join(',')}/>
            default:
                return null;
        }
    };

    const renderTabBar = (props: any) => (
        <TabBar activeColor={'#000'} inactiveColor={'#8f8d8d'}
                {...props}
                indicatorStyle={{backgroundColor: '#44ae18'}}
                style={{backgroundColor: '#fff'}}
        />
    );

    const getData = async () => {
        try {
            await AsyncStorage.getItem('chosen_options', (errs, result) => {
                if (result !== null) {
                    setChosenList(result ? result?.split(',').map(x => +x) : []);
                }
            })
                await AsyncStorage.getItem('favorites', (errs, result) => {
                if (result !== null) {
                    const favs: any[] = result?.split(',').map(x => +x) || [];
                    setFavorites(favs);
                   setIsFav(!!favs.find((barCode: any) => barCode === navigation.state.params));
                }
            })
        } catch (e) {
            console.log(e);
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
                setData(response.products[0])
            })
            .catch((error) => console.error('2', error))
    }, [navigation.state.params]);

    const found = data?.xref_product_2_components?.some((r: any) => chosenList?.includes(r?.component?.component_id));

    return (
        <Background>
            <Card style={styles.card}>
                <Button onPress={onFavClick} style={{width: 20}}>
                    <Icon name={'bookmark'} size={26} style={{display: 'flex',}} color={isFav ? '#4eae14' : '#c1c1c1'}/>
                </Button>
                <Card.Content style={styles.header}>
                    <Card.Cover style={styles.image} source={{uri: data.preview_image_url}}/>
                    <View style={{display: 'flex', flexDirection: 'column'}}>
                        {found && <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                            <Image source={require('../../assets/avoid.png')}
                                   style={{width: 60, height: 60, right: 4,}}/>
                            <Text style={{color: '#f15a4f', fontSize: 22, fontWeight: "bold",}}>AVOID</Text>
                        </View>
                        }
                        <Title style={{width: 200, fontSize: 16}}>{data.name}</Title>
                    </View>
                </Card.Content>
            </Card>
            <TabView renderTabBar={renderTabBar}
                     navigationState={{index, routes}}
                     renderScene={renderScene}
                     onIndexChange={setIndex}
                     initialLayout={{width: layout.width}}
            />
        </Background>
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
}

const styles = StyleSheet.create({
    view: {
        marginTop: 12,
    },
    card: {
        marginRight: 8,
        marginLeft: 8,
        marginTop: '20%',
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