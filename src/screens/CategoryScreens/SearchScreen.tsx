import * as React from 'react';
import {Image, ScrollView, StyleSheet, View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {useTheme} from 'react-navigation';
import {useEffect, useState} from "react";
import {Button, Card, Searchbar, Title} from "react-native-paper";
import {FlatGrid, SectionGrid} from "react-native-super-grid";
import {ProductList} from "./ProductList";
import Spinner from "../../components/spinner/Spinner";
import useDebounced from "../../helpers/useDebounced";

const operationsDoc = `
  query MyQuery($_eq: bigint = "") {
    categories {
      category_id
      image_url
      name
    }
  }
`;

const searchOperationsDoc = `
  query MyQuery($_ilike: String) {
    products(where: {name: {_ilike: $_ilike}}) {
      name
      barcode
      preview_image_url
      product_id
    }
  }
`;

export const SearchScreen = ({navigation, screenProps}: any) => {
    const theme = useTheme();
    const [products, setProducts] = useState([]);
    const [categories, setCategories]: any = useState([{
        category_id: 0,
        image_url: '',
        name: '',
    }]);
    const [loading, setLoading] = useState(false);

    const [searchValue, setSearchValue] = useState('');
    const [debounced, setDebounced] = useDebounced(searchValue, 800);

    const onCategoryClick = (id: number, name: string) => {
        navigation.navigate('CategoryScreen', {id, name});
    };

    const onSearchValueChange = (value: string) => {
        setSearchValue(value);
        setDebounced(value);
    };

    useEffect(() => {
        setLoading(true);
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
            .finally(() => setLoading(false))
    }, []);

    useEffect(() => {
        console.log(debounced);
        fetch(
            "http://64.225.106.248/v1/graphql",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'x-hasura-admin-secret': 'rj0PaUGIirrkaOJu034H',
                },
                body: JSON.stringify({
                    query: searchOperationsDoc,
                    variables: {'_ilike': `%${debounced}%`},
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
    }, [debounced]);

    if (loading) {
        return <View style={{backgroundColor: '#F5FAFA', height: '100%', justifyContent: "center"}}>
            <Spinner color={'#91bf91'} size={400}/>
        </View>
    }

    return (
        <View style={styles.background}>
            <Searchbar
                placeholder="Поиск по продуктам"
                onChangeText={onSearchValueChange}
                value={searchValue}
                style={styles.input} inputStyle={{fontSize: 16}}
            />
            {!debounced && <Text style={styles.categoryHeader}>Категории продуктов</Text>}
            {
                debounced ? <ProductList products={products} navigation={navigation}/> :
                    <ScrollView style={styles.view}>
                        <FlatGrid data={categories} itemContainerStyle={{}}
                                  spacing={10}
                                  style={styles.gridView}
                                  itemDimension={125}
                                  renderItem={({item}) => (
                                      <Card key={item.category_id} style={styles.mainCard}
                                            onPress={() => onCategoryClick(item.category_id, item.name)}>
                                          <Card.Cover style={styles.image}
                                                      source={{uri: item.image_url}}/>
                                          {/*<Title>{item.name}</Title>*/}
                                      </Card>
                                  )}
                        />
                    </ScrollView>
            }
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