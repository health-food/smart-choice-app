import * as React from 'react';
import PropTypes from 'prop-types';
import { createStackNavigator } from 'react-navigation-stack';
import SvgHome from './Svg.Profile';
import {ProfileScreen} from "../screens/profileScreen/ProfileScreen";
import {ChooseOptionsScreen} from "../screens/ChooseOptionsScreen";
import {ProfileSettingsScreen} from "../screens/profileScreen/ProfileSettingsScreen";
import colors from "../constants/colors";

const HomeTabBarIcon = ({ focused }: any) => <SvgHome active={focused} />;
HomeTabBarIcon.propTypes = {
    // required
    focused: PropTypes.bool.isRequired
};

const ProfileStack = createStackNavigator(
    {
        Home: ProfileScreen,
        ChooseOptions: ChooseOptionsScreen,
        ProfileSetting: ProfileSettingsScreen,
    },
    {
        navigationOptions: {
            tabBarLabel: 'Профиль',
            tabBarIcon: HomeTabBarIcon,
        }
    }
);

export default ProfileStack;