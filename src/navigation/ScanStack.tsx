import * as React from 'react';
import PropTypes from 'prop-types';
import { createStackNavigator } from 'react-navigation-stack';

// screens

// icons
import SvgHome from './Svg.Profile';
import {ScanScreen} from "../screens/ScanScreen";
import SvgScan from "./Svg.Scan";
import {ProductScreen} from "../screens/ProductScreen";

const HomeTabBarIcon = ({ focused }: any) => <SvgScan active={focused} />;
HomeTabBarIcon.propTypes = {
    // required
    focused: PropTypes.bool.isRequired
};

const ScanStack = createStackNavigator(
    {
        Home: ScanScreen,
        ProductScreen: {screen: ProductScreen},
    },
    {
        navigationOptions: {
            tabBarLabel: 'Scan',
            tabBarIcon: HomeTabBarIcon
        }
    }
);

export default ScanStack;