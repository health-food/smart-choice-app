import * as React from 'react';
import {ImageBackground, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useTheme} from 'react-navigation';
import {useEffect, useState} from "react";
import {Button, Card, Paragraph, Title} from "react-native-paper";

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

export const CategoryScreen = ({navigation, screenProps}: any) => {
    const theme = useTheme();
    const [categories, setCategories] = useState({
        category_id: 0,
        image_url: '',
        name: '',
        products: [],
    });
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
                    variables: {'_eq': navigation.state.params},
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

    return (
        <View>
            <ScrollView style={styles.view}>
                {
                    categories.products.map((product: any) => {
                        return (
                            <Card key={product.product_id} style={styles.mainCard} onPress={() => onProductClick(product.barcode)}>
                                <Card.Content style={styles.header}>
                                    <Card.Cover style={styles.image}
                                                source={{uri: product.preview_image_url}}/>
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

const styles = StyleSheet.create({
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