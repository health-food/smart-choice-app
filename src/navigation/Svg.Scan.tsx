import * as React from 'react';
import PropTypes from 'prop-types';
import Svg, { Path, G } from 'react-native-svg';
import { useTheme } from 'react-navigation';
import colors from "../constants/colors";

const SvgScan = ({active} : any) => {
    const theme = useTheme();
    const fill = active
        ? colors.activeTintColor[theme]
        : colors.inactiveTintColor[theme];

    return (
        <Svg
            width={31}
            height={23}
            viewBox="0 0 31 23"
            fill="none"
        >
            <Path
                d="M1.77 5.308H0V0h5.367v1.77H1.769v3.538zM30.195 5.308h-1.77V1.769h-3.597V0h5.367v5.308zM5.367 23H0v-5.308h1.77v3.539h3.597V23zM30.195 23h-5.367v-1.77h3.598v-3.538h1.769V23zM8.905 19.462H3.597V3.539h5.308v15.923zM19.52 19.462h-5.307V3.539h5.307v15.923zM10.674 3.539h1.77v15.923h-1.77V3.539zM21.29 3.539h1.769v15.923h-1.77V3.539zM24.828 3.539h1.77v15.923h-1.77V3.539z"
                fill={fill}
            />
        </Svg>
);
};

SvgScan.defaultProps = {
    active: false,
    size: 20
};

SvgScan.propTypes = {
    // optional
    active: PropTypes.bool,
    size: PropTypes.number
};

export default SvgScan;
