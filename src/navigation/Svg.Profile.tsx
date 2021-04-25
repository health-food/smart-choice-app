import * as React from 'react';
import PropTypes from 'prop-types';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from 'react-navigation';
import colors from "../constants/colors";

const SvgProfile = ({ active, size }: any) => {
    const theme = useTheme();
    const fill = active
        ? colors.activeTintColor[theme]
        : colors.inactiveTintColor[theme];

    return (
        <Svg height={size} width={size} viewBox="0 0 512 512">
            <Path fill={fill} d="M510.702 438.722c-2.251-10.813-12.84-17.754-23.657-15.503-10.814 2.251-17.755 12.843-15.503 23.656 1.297 6.229-.248 12.613-4.236 17.519-2.31 2.841-7.461 7.606-15.999 7.606H60.693c-8.538 0-13.689-4.766-15.999-7.606-3.989-4.905-5.533-11.29-4.236-17.519 20.756-99.695 108.691-172.521 210.24-174.977a137.229 137.229 0 0010.624-.001c71.532 1.716 137.648 37.947 177.687 97.66 6.151 9.175 18.574 11.625 27.75 5.474 9.174-6.151 11.625-18.575 5.473-27.749-32.817-48.944-80.47-84.534-134.804-102.417C370.538 220.036 392 180.477 392 136 392 61.01 330.991 0 256 0S120 61.01 120 136c0 44.504 21.488 84.084 54.633 108.911-30.368 9.998-58.863 25.555-83.803 46.069-45.732 37.617-77.529 90.086-89.532 147.742-3.762 18.067.745 36.623 12.363 50.909C25.222 503.847 42.365 512 60.693 512h390.613c18.329 0 35.472-8.153 47.032-22.369 11.62-14.286 16.126-32.842 12.364-50.909zM160 136c0-52.935 43.065-96 96-96s96 43.065 96 96c0 51.305-40.455 93.339-91.141 95.878a261.967 261.967 0 00-9.699.001C200.465 229.35 160 187.312 160 136z" />
        </Svg>
);
};

SvgProfile.defaultProps = {
    active: false,
    size: 20
};

SvgProfile.propTypes = {
    // optional
    active: PropTypes.bool,
    size: PropTypes.number
};

export default SvgProfile;
