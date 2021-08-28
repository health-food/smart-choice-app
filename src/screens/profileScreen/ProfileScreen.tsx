import * as React from 'react';
import {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useTheme} from 'react-navigation';
import {Button, Card, Paragraph, Title} from 'react-native-paper';
import {Background} from "../../components/Background";
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {err} from "react-native-svg/lib/typescript/xml";
import SvgFavorite from "../../navigation/Svg.Favorite";
import SvgAvatar from "./Svg.Avatar";

const operationsDoc = `
  query MyQuery {
    components(where: {type: {_eq: ALLERGEN}}) {
      component_id
      component_name
      image_url
    }
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

export const ProfileScreen = ({navigation, screenProps}: any) => {
    const theme = useTheme();
    const onEditPress = (id: number) => {
        navigation.navigate('ChooseOptions');
    };
    const onDietPress = () => {
        navigation.navigate('DietOptions');
    };
    const onEditProfileClick = () => {
        navigation.navigate('ProfileSetting');
    };

    const [name, setName]: [string, any] = useState('');
    const [components, setComponents]: any = useState([]);
    const [diets, setDiets]: any = useState([]);
    const [componentList, setComponentList]: any = useState([]);
    const [dietList, setDietList]: any = useState([]);

    const getChosen = async () => {
        // await AsyncStorage.removeItem('chosen_options');
        try {
            await AsyncStorage.getItem('chosen_options', (errs, result) => {
                if (result !== null) {
                    setComponentList(result ? result?.split(',').map(x => +x) : []);
                } else {
                    setComponentList([]);
                }
            })
            await AsyncStorage.getItem('chosen_diets', (errs, result) => {
                if (result !== null) {
                    setDietList(result ? result?.split(',').map(x => +x) : []);
                } else {
                    setDietList([]);
                }
            })
            await AsyncStorage.getItem('name', (errs, result) => {
                if (result !== null) {
                    setName(result);
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
                setComponents(response.components);
                setDiets(response.diets);
            })
            .catch((error) => console.error(error));
    }, []);

    useEffect(() => {
        const addListener = navigation.addListener('didFocus', async (payload: any) => {
            console.log('didFocus', payload)
            await getChosen();
        });
        return () => addListener.remove();
    }, [navigation]);


    function getDiets() {
        const filteredDiets = diets.filter((diet: any) => dietList.find((chosen: any) => chosen === diet.diet_id));
        if (filteredDiets.length === 0) {
            return <View style={{width: '98%'}}>
                <Text style={{textAlign: "center"}}>Здесь пока ничего нет.</Text>
                <Text style={{textAlign: "center"}}>
                    Для добавления типа диет нажмите на кнопку Изменить
                </Text>
            </View>;
        }
        return filteredDiets.map((product: any) => {
            return (
                <Card style={styles.product} key={product.diet_id}>
                    <Card.Cover style={styles.image}
                                source={{uri: product.image_url}}/>
                    <Paragraph>{product.name}</Paragraph>
                </Card>
            )
        });
    }

    function getComponents() {
        const filteredComponents = components.filter((component: any) => componentList.find((chosen: any) => chosen === component.component_id));
        if (filteredComponents.length === 0) {
            return <View style={{width: '55%'}}>
                <Text style={{textAlign: "center"}}>Здесь пока ничего нет.</Text>
                <Text style={{textAlign: "center"}}>
                    Для добавления продуктов, которые необходимо исключить из рациона, нажмите на кнопку Изменить
                </Text>
            </View>;
        }
        return filteredComponents.map((product: any) => {
            return (
                <Card style={styles.product} key={product.id}>
                    <Card.Cover style={styles.image}
                                source={{uri: product.image_url}}/>
                    <Paragraph>{product.component_name}</Paragraph>
                </Card>
            )
        });
    }

    return (
        <View style={styles.background}>
            <ScrollView style={styles.view}>
                <Background>
                    <View style={{marginTop: 32, marginBottom: 34, alignItems: "center"}}>
                        <SvgAvatar/>
                        <Text style={{
                                color: '#20AF40',
                                fontSize: 24,
                                marginTop: 12,
                                fontWeight: "bold",
                                letterSpacing: 0.24
                            }}>
                                {name}
                            </Text>
                        <Button color={'#20AF40'} compact mode={'contained'}
                                onPress={onEditProfileClick}
                            // icon={() => <Icon name={'edit'} size={20} color={'#000000'}/>}
                                style={{marginTop: 16, width: 240, borderRadius: 20}}>
                            <Text style={{color: '#fff', fontSize: 12}}>Редактировать профиль</Text>
                        </Button>
                    </View>
                </Background>
                <View style={styles.mainCard}>
                    <View style={styles.header}>
                        <Title style={{color: '#20AF40', fontSize: 18, fontWeight: "bold"}}>Нежелательные
                            продукты</Title>
                        <Button onPress={() => onEditPress(0)}>
                            <Text style={{fontSize: 12, color: '#20AF40'}}>
                                Изменить
                            </Text>
                        </Button>
                    </View>
                    <ScrollView horizontal={true}>
                        {getComponents()}
                    </ScrollView>
                </View>
                <View style={styles.mainCard}>
                    <View style={styles.header}>
                        <Title style={{color: '#20AF40', fontSize: 18, fontWeight: "bold"}}>Тип питания</Title>
                        <Button onPress={onDietPress}>
                            <Text style={{fontSize: 12, color: '#20AF40'}}>
                                Изменить
                            </Text>
                        </Button>
                    </View>
                    <ScrollView horizontal={true}>
                        {getDiets()}
                    </ScrollView>
                </View>
            </ScrollView>
        </View>
    );
};

ProfileScreen.navigationOptions = {
    title: '',
    headerTitleStyle: {fontFamily: "San Francisco"},
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
    view: {
        // marginTop: 12,
    },
    mainCard: {
        marginBottom: 12,
        marginRight: 18,
        marginLeft: 18,
        marginTop: 24
    },
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 14,
    },
    product: {
        marginRight: 12,
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        // elevation: 5,
        width: 120,
    },
    image: {
        width: '100%',
        height: 90,
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