import * as React from 'react';
import {StatusBar} from 'react-native';
import {ScreenOrientation} from 'expo';
import AppLoading from 'expo-app-loading';
import {Appearance} from 'react-native-appearance';

// tab navigator
import {useState} from "react";
import Stack from "../navigation/Stack";
import device from "../device";

export const HomeScreen = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [theme, setTheme] = useState('light');

    const iOSStatusType = theme === 'light' ? 'dark-content' : 'light-content';

    // if (isLoading) {
    //     return (
    //         <AppLoading
    //             onError={console.warn}
    //             onFinish={() => setIsLoading(false)}
    //             startAsync={func.loadAssetsAsync}
    //         />
    //     );
    // }
    return (
        <React.Fragment>
            <StatusBar barStyle={device.iOS ? iOSStatusType : 'light-content'}/>

            <Stack
                screenProps={{
                    updateTheme: (themeType: any) => setTheme(themeType),
                }}
        />
        </React.Fragment>
    );
}