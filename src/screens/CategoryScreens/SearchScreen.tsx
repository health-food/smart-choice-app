import * as React from 'react';
import {Image, ScrollView, StyleSheet, View, Text} from 'react-native';
import {useTheme} from 'react-navigation';
import {useEffect, useState} from "react";
import {Button, Card, Searchbar, Title} from "react-native-paper";
import {FlatGrid, SectionGrid} from "react-native-super-grid";

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
    const [searchQuery, setSearchQuery] = React.useState('');
    const [categories, setCategories]: any = useState([{
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
        <View style={styles.background}>
            <Searchbar
                placeholder="Поиск по продуктам"
                onChangeText={(query) => setSearchQuery(query)}
                value={searchQuery}
                style={styles.input} inputStyle={{ fontSize: 16 }}
            />
            <Text style={styles.categoryHeader}>Категории продуктов</Text>
            <ScrollView style={styles.view}>
                <FlatGrid data={categories} itemContainerStyle={{ }}
                          spacing={10}
                          style={styles.gridView}
                          itemDimension={125}
                          renderItem={({ item }) => (
                              <Card key={item.category_id} style={styles.mainCard}
                                    onPress={() => onCategoryClick(item.category_id)}>
                                      <Card.Cover style={styles.image}
                                                  source={{uri: item.image_url}}/>
                                      {/*<Title>{item.name}</Title>*/}
                              </Card>
                          )}
                />
                {/*{*/}
                {/*    categories.map(category => {*/}
                {/*        return <Card key={category.category_id} style={styles.mainCard}*/}
                {/*                     onPress={() => onCategoryClick(category.category_id)}>*/}
                {/*            <Card.Content style={styles.header}>*/}
                {/*                <Card.Cover style={styles.image}*/}
                {/*                            source={{uri: category.image_url}}/>*/}
                {/*                <Title>{category.name}</Title>*/}
                {/*            </Card.Content>*/}
                {/*        </Card>*/}
                {/*    })*/}
                {/*}*/}
            </ScrollView>
        </View>
    );
};

SearchScreen.navigationOptions = {
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
    gridView: {
        // marginTop: 10,
        flex: 1,
    },
    background: {
        backgroundColor: '#F5FAFA',
        height: '100%',
        top: 0,
    },
    view: {
        marginTop: 12,
        marginBottom: 100,
    },
    mainCard: {
        marginBottom: 12,
        width: 170,
        height: 170,
        borderRadius: 15,

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
        width: 170,
        height: 170,
        borderRadius: 10,
        // marginBottom: 8,
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
    input: {
        backgroundColor: '#FFFFFF',
        marginRight: 8,
        marginLeft: 8,
        borderRadius: 10,
        shadowRadius: 0,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        marginBottom: 32,
    },
    categoryHeader: {
        fontSize: 20,
        fontFamily: 'SF Pro Text',
        fontWeight: "bold",
        letterSpacing: -0.24,
        marginLeft: 8,
}
})