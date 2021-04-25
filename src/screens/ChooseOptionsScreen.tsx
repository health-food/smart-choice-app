import * as React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useTheme} from 'react-navigation';
import {Card, Title, Paragraph, Button, Checkbox} from 'react-native-paper';
import {useState} from "react";

const data = [
    {
        id: 0,
        title: 'Eggs',
        image: require('../../assets/logo.png'),
        chosen: false,
    },
    {
        id: 1,
        title: 'Tree Nuts',
        image: require('../../assets/logo.png'),
        chosen: false,
    },
    {
        id: 2,
        title: 'Fish',
        image: require('../../assets/logo.png'),
        chosen: false,
    },
    {
        id: 3,
        title: 'Lactose',
        image: require('../../assets/logo.png'),
        chosen: true,
    },
    {
        id: 4,
        title: 'Gluten',
        image: require('../../assets/logo.png'),
        chosen: false,
    },
    {
        id: 5,
        title: 'Meat',
        image: require('../../assets/logo.png'),
        chosen: false,
    },
    {
        id: 6,
        title: 'Sesame',
        image: require('../../assets/logo.png'),
        chosen: false,
    },
];

export const ChooseOptionsScreen = ({navigation, screenProps}: any) => {
    const theme = useTheme();
    const [list, setList] = useState(data);

    return (
        <View>
            <ScrollView style={styles.view}>
                {
                    list.map(item => (
                        <View style={styles.card} key={item.id}>
                            <Image style={styles.image}
                                   source={{uri: 'https://picsum.photos/700'}}/>
                            <Paragraph>{item.title}</Paragraph>
                            <Checkbox.IOS status={'checked'}
                                          color={item.chosen ? '#41d773' : '#d0cfcf'}
                                          onPress={() => {
                                              setList(list.map(it => it.id === item.id ? {
                                                  ...it, chosen: !it.chosen,
                                              } : it));
                                          }}
                            />
                        </View>
                    ))
                }
            </ScrollView>
        </View>
    );
};

ChooseOptionsScreen.navigationOptions = {
    title: 'Choose Options'
}

const styles = StyleSheet.create({
    view: {
        marginTop: 12,
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
        width: 70,
        height: 70,
        marginRight: 12,
    },

})