import * as React from 'react';
import {ImageBackground, ScrollView, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {useTheme} from 'react-navigation';
import {useEffect, useState} from "react";
import {Button, Card, Paragraph, Title} from "react-native-paper";
import {TabBar, TabView} from 'react-native-tab-view';
import {OverviewRoute} from "../OverviewRoute";
import {DetailsRoute} from "../DetailsRoute";
import {ProductListByTagScreen} from "./ProductListByTagScreen";

const operationsDoc = `
  query MyQuery($_eq: bigint = "") {
    categories(where: {category_id: {_eq: $_eq}}) {
      category_id
      name
      products {
        preview_image_url
        product_id
        name
        barcode
      }
    }
  }
`;

const operationsDoc1 = `
  query MyQuery($_eq: bigint) {
    tags(where: {category_id: {_eq: $_eq}}) {
      tag_id
      tag_name
    }
  }
`;

export const CategoryScreen = ({navigation, screenProps}: any) => {
    const theme = useTheme();
    const [categories, setCategories]: any = useState({
        category_id: 0,
        image_url: '',
        name: '',
        products: [],
    });
    const [tags, setTags] = useState([]);
    const [index, setIndex] = React.useState(0);
    const layout = useWindowDimensions();

    const onProductClick = (barcode: number) => {
        navigation.navigate('ProductScreen', barcode);
    };

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
                    variables: {'_eq': navigation.state.params.id},
                    operationName: 'MyQuery'
                })
            }
        )
            .then((response) => response.json())
            .then((json) => json.data)
            .then((response) => {
                setCategories(response.categories[0]);
            })
            .catch((error) => console.error(error))
    }, []);

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
                    query: operationsDoc1,
                    variables: {'_eq': navigation.state.params.id},
                    operationName: 'MyQuery'
                })
            }
        )
            .then((response) => response.json())
            .then((json) => json.data)
            .then((response) => {
                console.log(response);
                setTags(response.tags.map((tag: any) => {
                    return {
                        key: tag.tag_id,
                        title: tag.tag_name,
                    }
                }));
            })
            .catch((error) => console.error(error))
    }, []);

    const renderTabBar = (props: any) => (
            <TabBar activeColor={'#44ae18'} inactiveColor={'#A8A8A8'} scrollEnabled={true}
                    {...props}
                    indicatorStyle={{backgroundColor: '#44ae18'}}
                    style={{backgroundColor: '#F5FAFA'}}
                    labelStyle={{fontWeight: '600'}}
            />
    );

    const renderScene = ({route}: any) => {
        switch (route.key) {
            default:
                return <ProductListByTagScreen route={route} navigation={navigation}/>
        }
    };

    return (
        <View style={styles.background}>
            <Text style={styles.categoryTitle}>{navigation.state.params.name}</Text>
            <TabView renderTabBar={renderTabBar}
                     navigationState={{index, routes: tags}}
                     renderScene={renderScene}
                     onIndexChange={setIndex}
                     initialLayout={{width: layout.width}}
            />
            {/*<ScrollView style={styles.view}>*/}
            {/*    {*/}
            {/*        categories.products.map((product: any) => {*/}
            {/*            return (*/}
            {/*                <Card key={product.product_id} style={styles.mainCard} onPress={() => onProductClick(product.barcode)}>*/}
            {/*                    <Card.Content style={styles.header}>*/}
            {/*                        <Card.Cover style={styles.image}*/}
            {/*                                    source={{uri: product.preview_image_url}}/>*/}
            {/*                        <Title style={{fontSize: 16, width: 200}}>{product.name}</Title>*/}
            {/*                    </Card.Content>*/}
            {/*                </Card>*/}
            {/*            )*/}
            {/*        })*/}
            {/*    }*/}
            {/*</ScrollView>*/}
        </View>
    );
};

CategoryScreen.navigationOptions = {
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
    background: {
        backgroundColor: '#F5FAFA',
        height: '100%',
    },
    categoryTitle: {
        fontWeight: "bold",
        fontSize: 20,
        marginTop: 24,
        marginBottom: 16,
        color: '#2E2E2E',
    },
    view: {
        marginTop: 12,
    },
    mainCard: {
        marginBottom: 12,
        marginRight: 8,
        marginLeft: 8,
    },
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    product: {
        marginRight: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: 90,
    },
    image: {
        width: 150,
        height: 150,
        marginBottom: 8,
    },
    profileImage: {
        width: 85,
        height: 85,
        borderRadius: 75,
        borderColor: '#fff',
        borderWidth: 2,
        overflow: "hidden",
        // marginTop: 32,
        marginLeft: 2,
    },
})