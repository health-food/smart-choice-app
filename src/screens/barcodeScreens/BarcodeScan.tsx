import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Alert, Button} from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import Spinner from "../../components/spinner/Spinner";

export const BarcodeScan = ({navigation}: any) => {
    const [hasPermission, setHasPermission]: any = useState(null);
    const [scanned, setScanned] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            const {status} = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
        const didFocusSubscription = navigation.addListener(
            'didFocus',
            (payload: any) => {
                setScanned(false);
            }
        );
        return () => didFocusSubscription.remove();
    }, [navigation]);

    const handleBarCodeScanned = ({type, data}: any) => {
        if (type === 'org.iso.QRCode') {
            return;
        }
        setLoading(true);
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
                    Alert.alert(
                        "К сожалению, товар не найден",
                        "",
                        [
                            {text: "OK", onPress: () => setScanned(false)}
                        ]
                    );
                    saveNotFoundBarCode(data);
                }
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false))
    };

  const saveNotFoundBarCode = (barcode: number) => {
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
  mutation insert_not_found_barcodes($object: not_found_barcodes_insert_input!) {
    insert_not_found_barcodes_one(object: $object) {
      id
    }
  }
`, operationName: 'insert_not_found_barcodes',
            variables: {"object": {barcode: barcode}}
          })
        }
    )
    .then((response) => response.json())
    .then((json) => json.data)
    .then((response) => {
      console.log(`ненайденный штрихкод сохранен, id=${response.insert_not_found_barcodes_one.id}`);
    })
    .catch((error) => console.error(error));
  }

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
                    {
                        loading && <View style={{ top: '17%' }}>
                            <Spinner color={'#20AF40'} size={400}/>
                        </View>
                    }
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
