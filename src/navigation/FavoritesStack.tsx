import * as React from 'react';
import PropTypes from 'prop-types';
import {createStackNavigator} from 'react-navigation-stack';
import {ProductScreen} from "../screens/ProductScreen";
import SvgFavorite from "./Svg.Favorite";
import {FavoritesScreen} from "../screens/favoritesScreen/FavoritesScreen";
import colors from "../constants/colors";

const HomeTabBarIcon = ({ focused }: any) =>  <SvgFavorite active={focused} />;
HomeTabBarIcon.propTypes = {
    // required
    focused: PropTypes.bool.isRequired
};

const FavoritesStack = createStackNavigator(
    {
        Home: FavoritesScreen,
        ProductScreen: {screen: ProductScreen},
    },
    {
        navigationOptions: {
            tabBarLabel: 'Избранное',
            tabBarIcon: HomeTabBarIcon,
        }
    }
);

export default FavoritesStack;