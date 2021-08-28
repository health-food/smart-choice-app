import * as React from 'react';
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useTheme} from 'react-navigation';
import {Card, Title, Paragraph, Button, Checkbox} from 'react-native-paper';
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const operationsDoc = `
  query MyQuery {
     components(where: {type: {_eq: ALLERGEN}}) {
      component_id
      component_name
      image_url
    }
  }
`;

export const ChooseOptionsScreen = ({navigation, screenProps}: any) => {
    const theme = useTheme();
    const [list, setList]: any = useState([]);
    const [chosenList, setChosenList]: any = useState([]);

    const getChosen = async () => {
        // await AsyncStorage.removeItem('chosen_options');
        try {
            await AsyncStorage.getItem('chosen_options', (errs, result) => {
                if (result !== null) {
                    setChosenList(result ? result?.split(',').map(x=>+x) : []);
                }
            })

        } catch (e) {
            console.log(e);
            // error reading value
        }
    };

    useEffect(() => {
        getChosen();
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
                setList(response.components);
            })
            .catch((error) => console.error(error))
    }, []);

    const chosenToLocalStorage = async (itemId: number) => {
        try {
            if (chosenList?.find((chosen: number) => chosen === itemId)) {
                setChosenList(chosenList.filter((item: any) => item !== itemId));
                await AsyncStorage.setItem('chosen_options', chosenList ? chosenList.filter((item: any) => item !== itemId).join(',') : '')
            } else {
                setChosenList([...chosenList, itemId]);
                await AsyncStorage.setItem('chosen_options', [...chosenList, itemId].join(','))
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <View style={{backgroundColor: '#F5FAFA', height: '100%'}}>
            <ScrollView style={styles.view}>
                {
                    list.map((item: any) => (
                        <TouchableOpacity style={styles.card} key={item.component_id} activeOpacity={0.4}
                                          onPress={() => chosenToLocalStorage(item.component_id)} >
                            <Image style={styles.image}
                                   source={{uri: item.image_url}}/>
                            <Paragraph>{item.component_name}</Paragraph>
                            <Checkbox.IOS status={'checked'}
                                          color={chosenList?.find((chosen: number) => chosen === item.component_id) ? '#41d773' : '#d0cfcf'}
                            />
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>
        </View>
    );
};

ChooseOptionsScreen.navigationOptions = {
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
    view: {
        // height: '80%',
        backgroundColor: '#F5FAFA',
        marginBottom: 125,
    },
    card: {
        marginBottom: 12,
        marginRight: 8,
        marginLeft: 8,
        display: "flex",
        flexDirection: "row",
        backgroundColor: '#fff',
        alignItems: "center",
        justifyContent: "space-between",

    },
    image: {
        width: 100,
        height: 80,
        marginRight: 12,
        borderRadius: 10,
    },

})