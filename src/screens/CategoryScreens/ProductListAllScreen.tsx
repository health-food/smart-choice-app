import * as React from 'react';
import {ImageBackground, ScrollView, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {useTheme} from 'react-navigation';
import {useEffect, useState} from "react";
import {Button, Card, Paragraph, Title} from "react-native-paper";
import {TabBar, TabView} from 'react-native-tab-view';
import {OverviewRoute} from "../OverviewRoute";
import {DetailsRoute} from "../DetailsRoute";
import {ProductList} from "./ProductList";

const operationsDoc = `
 query MyQuery($_eq: bigint) {
    products(where: {category_id: {_eq: $_eq}}, limit: 10, offset: 10) {
      name
      barcode
      preview_image_url
      product_id
      composition
    }
  }
`;

export const ProductListAllScreen = ({navigation, categoryId }: any) => {
    const theme = useTheme();
    const [products, setProducts]: any = useState([]);

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
                    variables: {'_eq': categoryId},
                    operationName: 'MyQuery'
                })
            }
        )
            .then((response) => response.json())
            .then((json) => json.data)
            .then((response) => {
                setProducts(response.products);
            })
            .catch((error) => console.error(error))
    }, []);

    return <ProductList products={products} navigation={navigation}/>
};

ProductListAllScreen.navigationOptions = {
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
