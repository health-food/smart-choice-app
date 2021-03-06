import * as React from 'react';
import {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useTheme} from 'react-navigation';
import {Checkbox, Paragraph} from 'react-native-paper';
import {storage} from "../../storage/Storage";

const notInList = (list: any) => (elem: any) => {
    return !list.find((id: any) => id === elem);
};


const merge = (f: any, s: any) => {
    return Array.from(new Set([...f, ...s]));
};

const convertArrayToObject = (array: any, key: any) =>
    array.reduce(
        (obj: any, item: any) => ({
            ...obj,
            [item[key]]: item
        }),
        {}
    );
const fetchAllDietsList = async () => {
    return fetch(
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
        .then((response) => response.diets)
};

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
    const [dietList, setDietList]: any = useState([]);
    const [chosenComponentList, setChosenComponentList]: any = useState([]);
    const [chosenDietList, setChosenDietList]: any = useState([]);

    const dietsById = convertArrayToObject(dietList, 'diet_id');

    useEffect(() => {
        storage.getChosenDiets().then(chosenDiets => setChosenDietList(chosenDiets));
        storage.getChosenComponents().then(chosenComponents => setChosenComponentList(chosenComponents));
        fetchAllDietsList()
            .then(diets => setDietList(diets))
            .catch(error => console.error(error))
        // todo; save ?? ?????????? storage ???? ???????? ?? ??????????????
    }, []);

    const getComponentsIdsByDietId = (diet_id: any) => {
        return dietsById[diet_id].xref_diet_2_components.map((component: any) => component.component.component_id);
    };

    const getComponentIdsToDelete = (dietComponentsIds:any, otherDietsIds:any) => {
        const otherDietComponentIds = merge(otherDietsIds.flatMap(getComponentsIdsByDietId), []);
        var filter = dietComponentsIds.filter(notInList(otherDietComponentIds));
        return filter;
    };


    const onDietClick = async (diet_id: any, isChecked: boolean) => {
        const dietComponentsIds = getComponentsIdsByDietId(diet_id);
        let chosenComponentIds;
        let dietIds;

        if (isChecked) {
            dietIds = merge(chosenDietList, [diet_id]);
            chosenComponentIds = merge(chosenComponentList, dietComponentsIds);
        } else {
            dietIds = chosenDietList.filter((d_id: any) => d_id != diet_id);
            const componentIdsToDelete = getComponentIdsToDelete(dietComponentsIds, dietIds);
            chosenComponentIds = chosenComponentList.filter(notInList(componentIdsToDelete));
        }

        setChosenDietList(dietIds);
        setChosenComponentList(chosenComponentIds);

        await storage.setChosenDiets(dietIds);
        await storage.setChosenComponents(chosenComponentIds);
    };

    const renderedList = dietList
        .map((diet: any) => {
            return {
                ...diet,
                isChecked: chosenDietList.find((chosen: number) => chosen === diet.diet_id)
            }
        });

    return (
        <View>
            <ScrollView style={styles.view}>
                {renderedList.map((diet: any) => (
                    <TouchableOpacity style={styles.card} key={diet.component_id} activeOpacity={0.4}
                                      onPress={() => onDietClick(diet.diet_id, !diet.isChecked)} >
                        <Image
                            style={styles.image}
                            source={{uri: diet.image_url}}
                        />
                        <Paragraph>
                            {diet.name}
                        </Paragraph>
                        <Checkbox.IOS
                            status={'checked'}
                            color={diet.isChecked ? '#41d773' : '#d0cfcf'}
                        />
                    </TouchableOpacity>
                ))}
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
};

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

});