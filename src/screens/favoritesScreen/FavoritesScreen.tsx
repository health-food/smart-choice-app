import * as React from 'react';
import {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, Card, Title} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";

const operationsDoc = `
  query MyQuery($_in: [bigint!]) {
    products(where: {barcode: {_in: $_in}}) {
      name
      barcode
      xref_product_2_components {
        component {
          component_id
          component_name
          image_url
        }
      }
      preview_image_url
      product_id
    }
  }
`;

export const FavoritesScreen = ({navigation, screenProps}: any) => {
    const [favorites, setFavorites]: any = useState([]);
    const [products, setProducts]: any = useState([]);

    const onProductClick = (barcode: number) => {
        navigation.navigate('ProductScreen', barcode);
    };

    const getFavoritesFromStorage = async () => {
        try {
            await AsyncStorage.getItem('favorites', (errs, result) => {
                if (result !== null) {
                    const favs: any[] = result?.split(',').map(x => +x) || [];
                    setFavorites(favs);
                }
            }).then()
        } catch (e) {
            console.log(e);
            // error reading value
        }
    };

    useEffect(() => {
        const didFocusSubscription = navigation.addListener(
            'didFocus',
            (payload: any) => {
                getFavoritesFromStorage();
            }
        );
        return didFocusSubscription;
    }, []);

    useEffect(() => {
        getFavoritesFromStorage();
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
                    query: operationsDoc,
                    variables: {"_in": favorites},
                    operationName: 'MyQuery'
                })
            }
        )
            .then((response) => response.json())
            .then((json) => setProducts(json.data.products))
    }, [favorites]);

    const onFavClick = async (item: number) => {
        const favs = favorites.filter((barCode: number) => barCode !== item);
        const productList = products.filter((product: any) => product.barcode !== item);
        // setFavorites(favs);
        console.log('favs', favs);
        console.log('productList', productList);
        setProducts(productList);
        await AsyncStorage.setItem('favorites', favs.join(','));
        console.log(await  AsyncStorage.getItem('favorites'));
    };

    return (
        <View style={styles.background}>
            {/*<ProductList navigation={navigation} products={products} />*/}
            <ScrollView style={styles.view}>
                {
                    products.map((product: any) => {
                        return (
                            <Card key={product.product_id} style={styles.mainCard}
                                  onPress={() => onProductClick(product.barcode)}>
                                <Card.Content style={styles.header}>
                                    <Card.Cover style={styles.image}
                                                source={{uri: product.preview_image_url}}/>
                                    <Button onPress={() => onFavClick(product.barcode)}
                                            style={{width: 20, right: 6, top: -14,}}>
                                        <Icon name={'bookmark'} size={26} style={{display: 'flex'}}
                                              color={'#4eae14'}/>
                                    </Button>
                                    <Title style={{fontSize: 16, width: 200}}>{product.name}</Title>
                                </Card.Content>
                            </Card>
                        )
                    })
                }
            </ScrollView>
        </View>
    );
};

FavoritesScreen.navigationOptions = {
    title: 'Избранное',
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
    }
})