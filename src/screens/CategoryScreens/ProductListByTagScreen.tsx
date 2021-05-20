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
  query MyQuery($_eq: bigint = "") {
    xref_tag_2_product(where: {tag_id: {_eq: $_eq}}, limit: 10, offset: 10) {
      product {
        barcode
        name
        product_id
        preview_image_url
      }
    }
  }
`;

export const ProductListByTagScreen = ({navigation, route }: any) => {
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
                    variables: {'_eq': route.key},
                    operationName: 'MyQuery'
                })
            }
        )
            .then((response) => response.json())
            .then((json) => json.data)
            .then((response) => {
                setProducts(response.xref_tag_2_product.map((product: any) => product.product));
            })
            .catch((error) => console.error(error))
    }, []);

    return <ProductList products={products} navigation={navigation}/>
};

ProductListByTagScreen.navigationOptions = {
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
        borderRadius: 10,
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
        width: 120,
        height: 120,
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