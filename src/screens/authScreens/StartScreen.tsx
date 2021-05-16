import React from 'react'
import {Button} from "../../components/Button";
import {StyleSheet, KeyboardAvoidingView} from "react-native";
import Logo from "../../components/Logo";
import Header from "../../components/Header";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        width: '100%',
        maxWidth: 340,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export const StartScreen = ({ navigation } : any) => {
    return (
        <KeyboardAvoidingView style={styles.container}>
            <Logo/>
            <Header>Smart choice</Header>
            <Button
                mode="contained"
                onPress={() => navigation.navigate('LoginScreen')}
            >
                Login
            </Button>
            <Button
                mode="outlined"
                onPress={() => navigation.navigate('RegisterScreen')}
            >
                Sign Up
            </Button>
        </KeyboardAvoidingView>
    )
}