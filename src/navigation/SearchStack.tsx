import * as React from 'react';
import PropTypes from 'prop-types';
import { createStackNavigator } from 'react-navigation-stack';

// screens

// icons
import {SearchScreen} from "../screens/SearchScreen";
import SvgSearch from "./Svg.Search";
import {CategoryScreen} from "../screens/CategoryScreen";
import {ProductScreen} from "../screens/ProductScreen";

const HomeTabBarIcon = ({ focused }: any) => <SvgSearch active={focused} />;
HomeTabBarIcon.propTypes = {
    // required
    focused: PropTypes.bool.isRequired
};

const SearchStack = createStackNavigator(
    {
        Home: SearchScreen,
        CategoryScreen: CategoryScreen,
        ProductScreen: {screen: ProductScreen},
    },
    {
        navigationOptions: {
            tabBarLabel: 'Search',
            tabBarIcon: HomeTabBarIcon
        }
    }
);

export default SearchStack;