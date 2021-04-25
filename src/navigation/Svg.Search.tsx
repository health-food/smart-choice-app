import * as React from 'react';
import PropTypes from 'prop-types';
import Svg, { Path, G } from 'react-native-svg';
import { useTheme } from 'react-navigation';
import colors from "../constants/colors";

const SvgSearch = ({active} : any) => {
    const theme = useTheme();
    const fill = active
        ? colors.activeTintColor[theme]
        : colors.inactiveTintColor[theme];

    return (
        <Svg
            // xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -20 600 712"
        >
            <Path fill={fill} d="M141.367 116.518c-7.384-7.39-19.364-7.39-26.748 0-27.416 27.416-40.891 65.608-36.975 104.79.977 9.761 9.2 17.037 18.803 17.037.631 0 1.267-.032 1.898-.095 10.398-1.04 17.983-10.316 16.943-20.707-2.787-27.845 6.722-54.92 26.079-74.278 7.39-7.383 7.39-19.364 0-26.747z" />
            <Path fill={fill} d="M216.276 0C97.021 0 0 97.021 0 216.276s97.021 216.276 216.276 216.276 216.276-97.021 216.276-216.276S335.53 0 216.276 0zm0 394.719c-98.396 0-178.443-80.047-178.443-178.443S117.88 37.833 216.276 37.833c98.39 0 178.443 80.047 178.443 178.443s-80.047 178.443-178.443 178.443z" />
            <Path fill={fill} d="M506.458 479.71L368.999 342.252c-7.39-7.39-19.358-7.39-26.748 0-7.39 7.384-7.39 19.364 0 26.748L479.71 506.458A18.848 18.848 0 00493.084 512c4.843 0 9.679-1.847 13.374-5.542 7.389-7.384 7.389-19.364 0-26.748z" />
           </Svg>
);
};

SvgSearch.defaultProps = {
    active: false,
    size: 20
};

SvgSearch.propTypes = {
    // optional
    active: PropTypes.bool,
    size: PropTypes.number
};

export default SvgSearch;
