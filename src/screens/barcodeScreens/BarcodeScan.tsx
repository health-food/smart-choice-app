import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Button, Image} from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';

export const BarcodeScan = ({navigation}: any) => {
    const [hasPermission, setHasPermission]: any = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        (async () => {
            const {status} = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({type, data}: any) => {
        setScanned(true);
        fetch(
            "http://64.225.106.248/v1/graphql",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'x-hasura-admin-secret': 'rj0PaUGIirrkaOJu034H',
                },
                body: JSON.stringify({
                    query: `
 query MyQuery($_eq: bigint = "") {
    products(where: {barcode: {_eq: $_eq}}) {
      name
    }
  }
`,
                    variables: {"_eq": data},
                    operationName: 'MyQuery'
                })
            }
        )
            .then((response) => response.json())
            .then((json) => json.data)
            .then((response) => {
                if (response?.products.length) {
                    navigation.navigate('ProductScreen', data);
                } else {
                    alert(`К сожалению, товар не найден`);
                }
            })
            .catch((error) => console.error(error))
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={[StyleSheet.absoluteFill, styles.container ]}
            >
                <View style={styles.layerTop}/>
                <View style={styles.layerCenter}>
                    <View style={styles.layerLeft}/>
                    <View style={styles.focused}/>
                    <View style={styles.layerRight}/>
                </View>
                <View style={styles.layerBottom}/>
            </BarCodeScanner>
            {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)}/>}
        </View>
    );
};

const opacity = 'rgba(0, 0, 0, .6)';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    layerTop: {
        flex: 2,
        backgroundColor: opacity,
    },
    layerCenter: {
        flex: 1,
        flexDirection: 'row',
    },
    layerLeft: {
        flex: 1,
        backgroundColor: opacity
    },
    focused: {
        flex: 10,
        borderRightWidth: 2,
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderLeftWidth: 2,
        borderColor: '#c4c4c4',
    },
    layerRight: {
        flex: 1,
        backgroundColor: opacity
    },
    layerBottom: {
        flex: 2,
        backgroundColor: opacity
    },
});