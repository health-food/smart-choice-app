import * as React from 'react';
import PropTypes from 'prop-types';
import {createStackNavigator} from 'react-navigation-stack';

// screens

// icons
import SvgHome from './Svg.Profile';
import {ScanScreen} from "../screens/barcodeScreens/ScanScreen";
import SvgScan from "./Svg.Scan";
import {ProductScreen} from "../screens/productScreen/ProductScreen";
import colors from "../constants/colors";

const HomeTabBarIcon = ({focused}: any) => <SvgScan active={focused}/>;
HomeTabBarIcon.propTypes = {
    focused: PropTypes.bool.isRequired,
    color: 'red',
};

const ScanStack = createStackNavigator(
    {
        Home: ScanScreen,
        ProductScreen: {screen: ProductScreen},
    },
    {
        navigationOptions: {
            tabBarLabel: 'Сканировать',
            tabBarIcon: HomeTabBarIcon,
        }
    }
);

export default ScanStack;