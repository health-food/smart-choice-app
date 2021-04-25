import {ImageBackground, StyleSheet, KeyboardAvoidingView, Dimensions} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { View } from 'react-native'

export const Background = ({ children } : {children: any}) => {
    return (
        <View style={styles.wrapper}>
            <LinearGradient colors={['#d49f43', '#fcc80f']} style={styles.container} />
            {children}
        </View>
    )
}
const { height, width } = Dimensions.get('window')

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    container: {
        width: '200%',
        height: height * 0.45,
        left: -width * 0.3,
        top: -height * 0.25,
        // transform: [{ skewY: '-30deg' }],
        position: 'absolute',
        zIndex: -1,
    },
})
