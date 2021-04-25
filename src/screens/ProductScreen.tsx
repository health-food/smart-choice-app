import * as React from 'react';
import {StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {useTheme} from 'react-navigation';
import {Card, Title} from 'react-native-paper';
import {Background} from "../components/Background";
import {TabBar, TabView} from 'react-native-tab-view';
import {OverviewRoute} from "./OverviewRoute";
import {DetailsRoute} from "./DetailsRoute";
import {useEffect, useState} from "react";

const operationsDoc = `
 query MyQuery($_eq: bigint = "") {
    products(where: {barcode: {_eq: $_eq}}) {
      calories
      carbs
      composition
      description
      fats
      normalized_composition
      name
      proteins
      storage_conditions_info
      weight
      preview_image_url
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
    const [data, setData] = useState({
        calories: '',
        carbs: '',
        composition: [],
        description: '',
        fats: '',
        normalized_composition: '',
        name: '',
        proteins: '',
        storage_conditions_info: '',
        weight: '',
        preview_image_url: '',
    });
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        {key: 'first', title: 'Overview'},
        {key: 'second', title: 'Details'},
        {key: 'third', title: 'Ingredients'},
    ]);

    const renderScene = ({route}: any) => {
        switch (route.key) {
            case 'first':
                return (
                    <OverviewRoute/>
                );
            case 'second':
                return <DetailsRoute carbs={data.carbs}
                                     fats={data.fats}
                                     proteins={data.proteins}
                                     weight={data.weight}
                                     calories={data.calories} />
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

    useEffect(() => {
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
            .catch((error) => console.error(error))
    }, [navigation.state.params]);

    return (
        <Background>
            <Card style={styles.card}>
                <Card.Content style={styles.header}>
                    <Card.Cover style={styles.image} source={{uri: data.preview_image_url}}/>
                    <Title style={{width: 200, fontSize: 16}}>{data.name}</Title>
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
    title: 'Product',
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