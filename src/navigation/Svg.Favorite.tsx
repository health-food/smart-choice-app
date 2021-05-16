import * as React from 'react';
import PropTypes from 'prop-types';
import Svg, {Path, G} from 'react-native-svg';
import {useTheme} from 'react-navigation';
import colors from "../constants/colors";

const SvgFavorite = ({active}: any) => {
    const theme = useTheme();
    const fill = active
        ? colors.activeTintColor[theme]
        : colors.inactiveTintColor[theme];

    return (
        <Svg
            width={18}
            height={24}
            viewBox="0 0 18 24"
            fill="none"
        >
            <Path
                d="M15.958 0H2.117C.99 0 0 .933 0 2.037v20.6c0 .37.102.677.267.915.197.285.515.448.855.448.322 0 .664-.144.98-.416l6.193-5.29c.191-.164.466-.258.752-.258.285 0 .56.094.751.259l6.172 5.288c.317.273.636.417.957.417.544 0 1.073-.422 1.073-1.363v-20.6A2.053 2.053 0 0015.958 0z"
                fill={fill}
            />
        </Svg>
    );
}

SvgFavorite.defaultProps = {
    active: false,
};

SvgFavorite.propTypes = {
    // optional
    active: PropTypes.bool,
    size: PropTypes.number
};

export default SvgFavorite;
