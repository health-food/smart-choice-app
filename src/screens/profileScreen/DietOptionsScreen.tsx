import * as React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useTheme} from 'react-navigation';
import {Card, Title, Paragraph, Button, Checkbox} from 'react-native-paper';
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const operationsDoc = `
  query MyQuery {
    diets {
      diet_id
      image_url
      name
      xref_diet_2_components {
        component {
          component_id
          component_name
          image_url
        }
      }
    }
  }
`;

export const DietOptionsScreen = ({navigation, screenProps}: any) => {
    const theme = useTheme();
    const [list, setList]: any = useState([]);
    const [componentList, setComponentList]: any = useState([]);
    const [dietList, setDietList]: any = useState([]);

    const getChosen = async () => {
        // await AsyncStorage.removeItem('chosen_options');
        try {
            await AsyncStorage.getItem('chosen_options', (errs, result) => {
                if (result !== null) {
                    setComponentList(result ? result?.split(',').map(x=>+x) : []);
                }
            })
            await AsyncStorage.getItem('chosen_diets', (errs, result) => {
                if (result !== null) {
                    setDietList(result ? result?.split(',').map(x=>+x) : []);
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
                setList(response.diets);
            })
            .catch((error) => console.error(error))
    }, []);

    const chosenToLocalStorage = async (dietClicked: any) => {

        try {
            if (dietList?.find((chosen: number) => chosen === dietClicked.diet_id)) {
                const filteredDiet = dietList.filter((diet: any) => diet !== dietClicked.diet_id);
                setDietList(filteredDiet);
                await AsyncStorage.setItem('chosen_diets', filteredDiet.join(','))
                let resultComponents = dietClicked.xref_diet_2_components.map((component: any) => component.component.component_id);
                let result = componentList.filter((componentId: any) => !resultComponents.includes(componentId));
                await AsyncStorage.setItem('chosen_options', result.join(','))
            } else {
                setDietList([...dietList, dietClicked.diet_id]);
                await AsyncStorage.setItem('chosen_diets', [...dietList, dietClicked.diet_id].join(','));
                let dietComponentIds = dietClicked.xref_diet_2_components.map((component: any) => component.component.component_id);
                let resultComponents: any[] = Array.from(new Set([componentList.concat(dietComponentIds)]));
                await AsyncStorage.setItem('chosen_options', resultComponents.join(','))
            }
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <View>
            <ScrollView style={styles.view}>
                {
                    list.map((item: any) => (
                        <View style={styles.card} key={item.diet_id}>
                            <Image style={styles.image}
                                   source={{uri: item.image_url}}/>
                            <Paragraph>{item.name}</Paragraph>
                            <Checkbox.IOS status={'checked'}
                                          color={dietList?.find((chosen: number) => chosen === item.diet_id) ? '#41d773' : '#d0cfcf'}
                                          onPress={() => chosenToLocalStorage(item)}
                            />
                        </View>
                    ))
                }
            </ScrollView>
        </View>
    );
};

DietOptionsScreen.navigationOptions = {
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
        backgroundColor: '#F5FAFA',
        height: '100%',
    },
    card: {
        marginTop: 12,
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