import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Alert} from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';

export const BarcodeScan = ({navigation}: any) => {
    const [hasPermission, setHasPermission]: any = useState(null);
    const [scanned, setScanned] = useState(true);

    useEffect(() => {
        (async () => {
            const {status} = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
            if (navigation.isFocused()) {
                setScanned(false);
            }
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
                    // alert(`К сожалению, товар не найден`);
                    Alert.alert(
                        "К сожалению, товар не найден",
                        "",
                        [
                            { text: "OK", onPress: () => setScanned(false)}
                        ]
                    );
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
            <Text style={styles.info}>Поместите штрих-код продукта в рамку.
                Считывание произойдет автоматически.</Text>
            <View style={styles.barCodeScanner}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={{flex: 1,}}
                    // style={styles.barCodeScanner}
                >
                    <View style={styles.layerTop}/>
                    <View style={styles.layerCenter}>
                        <View style={styles.layerLeft}/>
                        <View style={styles.focused}/>
                        <View style={styles.layerRight}/>
                    </View>
                    <View style={styles.layerBottom}/>
                </BarCodeScanner>
                {/*{scanned && <Button title={'Tap to Scan'} onPress={() => setScanned(false)}/>}*/}
            </View>
        </View>
    );
};

const opacity = 'rgba(0, 0, 0, .6)';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        // justifyContent: 'center',
    },
    info: {
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 17,
        textAlign: "center",
        letterSpacing: -0.24,
        color: '#2E2E2E',
        marginTop: 20,
        marginBottom: 20,
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    barCodeScanner: {
        flex: 1,
        marginRight: 30,
        marginLeft: 30,
        marginBottom: 130,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: opacity,
    },
    layerTop: {
        flex: 1,
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
        borderWidth: 4,
        borderColor: '#20AF40',
        borderRadius: 15,
    },
    layerRight: {
        flex: 1,
        backgroundColor: opacity
    },
    layerBottom: {
        flex: 1,
        backgroundColor: opacity
    },
});