import * as React from 'react';
import {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useTheme} from 'react-navigation';
import {Button, Card, Title} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const operationsDoc = `
 query MyQuery($_eq: bigint) {
    products(where: {category: {tags: {tag_id: {_eq: $_eq}}}}) {
      name
      preview_image_url
      product_id
      barcode
    }
  }
`;

export const ProductList = ({navigation, products }: any) => {
    const onProductClick = (barcode: number) => {
        navigation.navigate('ProductScreen', barcode);
    };

    return (
        <View style={styles.background}>
            <ScrollView style={styles.view}>
                {
                    products.map((product: any) => {
                        return (
                            <Card key={product.product_id} style={styles.mainCard} onPress={() => onProductClick(product.barcode)}>
                                <Card.Content style={styles.header}>
                                    <Card.Cover style={styles.image}
                                                source={{uri: product.preview_image_url}}/>
                                    <Title style={{fontSize: 14, width: 270, }}>{product.name}</Title>
                                </Card.Content>
                            </Card>
                        )
                    })
                }
            </ScrollView>
        </View>
    );
};

ProductList.navigationOptions = {
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
        maxHeight: '80%',
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