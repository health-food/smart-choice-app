import { createBottomTabNavigator } from 'react-navigation-tabs';
// navigation stacks
import ProfileStack from './ProfileStack';
import colors from "../constants/colors";
import SearchStack from "./SearchStack";
import ScanStack from "./ScanStack";

const BottomTabNavigator = createBottomTabNavigator(
    {
        SearchStack,
        ScanStack,
        ProfileStack,
    },
    {
        initialRouteName: 'ScanStack',
        tabBarOptions: {
            activeTintColor: {
                light: colors.darkColor,
                dark: colors.grey
            },
            inactiveTintColor: {
                light: colors.grey,
                dark: colors.white20
            }
        }
    }
);

export default BottomTabNavigator;