import React, { useState } from 'react'
import {BackButton} from '../../components/BackButton'
import Logo from '../../components/Logo'
import Header from '../../components/Header'
import {TextInput} from '../../components/TextInput'
import {Button} from '../../components/Button'
import { emailValidator } from '../../helpers/emailValidator'
import {KeyboardAvoidingView, StyleSheet} from "react-native";

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
})

export const ResetPasswordScreen = ({ navigation }: any) => {
    const [email, setEmail] = useState({ value: '', error: '' })

    const sendResetPasswordEmail = () => {
        const emailError = emailValidator(email.value)
        if (emailError) {
            setEmail({ ...email, error: emailError })
            return
        }
        navigation.navigate('LoginScreen')
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <BackButton goBack={navigation.goBack} />
            <Logo />
            <Header>Restore Password</Header>
            <TextInput
                label="E-mail address"
                returnKeyType="done"
                value={email.value}
                onChangeText={(text: string) => setEmail({ value: text, error: '' })}
                error={!!email.error}
                errorText={email.error}
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
                description="You will receive email with password reset link."
            />
            <Button
                mode="contained"
                onPress={sendResetPasswordEmail}
                style={{ marginTop: 16 }}
            >
                Send Instructions
            </Button>
        </KeyboardAvoidingView>
    )
}