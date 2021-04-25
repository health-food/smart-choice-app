import * as React from 'react';
import {ImageBackground, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useTheme} from 'react-navigation';
import {useEffect, useState} from "react";
import {Button, Card, Paragraph, Title} from "react-native-paper";

const operationsDoc = `
  query MyQuery($_eq: bigint = "") {
    categories {
      category_id
      image_url
      name
    }
  }
`;

export const SearchScreen = ({navigation, screenProps}: any) => {
    const theme = useTheme();
    const [categories, setCategories] = useState([{
        category_id: 0,
        image_url: '',
        name: '',
    }]);
    const onCategoryClick = (id: number) => {
        navigation.navigate('CategoryScreen', id);
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
                    variables: {},
                    operationName: 'MyQuery'
                })
            }
        )
            .then((response) => response.json())
            .then((json) => json.data)
            .then((response) => {
                setCategories(response.categories);
            })
            .catch((error) => console.error(error))
    }, []);

    return (
        <View>
            <ScrollView style={styles.view}>
                {
                    categories.map(category => {
                        return <Card key={category.category_id} style={styles.mainCard} onPress={() => onCategoryClick(category.category_id)}>
                            <Card.Content style={styles.header}>
                                <Card.Cover style={styles.image}
                                            source={{uri: category.image_url}}/>
                                <Title>{category.name}</Title>
                            </Card.Content>
                        </Card>
                    })
                }
            </ScrollView>
        </View>
    );
};

SearchScreen.navigationOptions = {
    title: 'Search'
}

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