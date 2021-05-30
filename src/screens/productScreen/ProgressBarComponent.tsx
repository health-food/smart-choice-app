import {StyleSheet, Text, View} from "react-native";
import * as React from "react";
import {ProgressBar} from 'react-native-paper';

export const ProgressBarComponent = ({value, percentage, name}: any) => {
    const whatColor = () => {
        if (percentage < 0.3) {
            return {
                color: '#62CB8E',
                backgroundColor: '#E6FAE1',
            }
        }
        if (percentage < 0.6 ) {
            return {
                color: '#71CBE5',
                backgroundColor: '#E1F4FA',
            }
        }

        return {
            color: '#E0767D',
            backgroundColor: '#FAE9E1',
        }
    }

    const { color,backgroundColor } = whatColor();

    return (
        <View style={styles.view}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.value}>{value}г</Text>
            <ProgressBar progress={percentage} color={color} style={[styles.progressBar, {backgroundColor: backgroundColor}]}/>
            <Text style={[styles.percentage, {color: color}]}>{Math.round(percentage * 100)}%</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    view: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginTop: 12,
    },
    progressBar: {
        height: 7,
        borderRadius: 10,
        width: 200,
    },
    name: {
        color: '#2E2E2E',
        fontWeight: '600',
        fontSize: 14,
        letterSpacing: -0.24,
    },
    value: {
        color: '#A8A8A8',
        fontSize: 14,
        lineHeight: 22,
        fontWeight: '600',
    },
    percentage: {
        fontWeight: '600',
        fontSize: 14,
    },
})