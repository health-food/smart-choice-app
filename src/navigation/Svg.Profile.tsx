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
        <Svg
            width={27}
            height={27}
            viewBox="0 0 27 27"
            fill="none"
        >
            <Path
                d="M13.5 9.545a3.167 3.167 0 00-3.164 3.164 3.167 3.167 0 003.164 3.164 3.167 3.167 0 003.164-3.164A3.167 3.167 0 0013.5 9.545z"
                fill={fill}
            />
            <Path
                d="M26.339 11.138l-2.102-.342a10.968 10.968 0 00-1.234-2.974l1.208-1.693a.79.79 0 00-.084-1.019L21.89 2.873a.788.788 0 00-1.02-.084l-1.692 1.208a10.965 10.965 0 00-2.974-1.234L15.862.66a.79.79 0 00-.78-.661h-3.164a.79.79 0 00-.78.661l-.342 2.102a10.967 10.967 0 00-2.974 1.234L6.129 2.789a.788.788 0 00-1.019.084L2.873 5.11a.79.79 0 00-.084 1.019l1.208 1.693c-.557.929-.971 1.925-1.234 2.974l-2.102.342a.79.79 0 00-.661.78v3.164c0 .387.28.717.661.78l2.102.342a10.967 10.967 0 001.234 2.974l-1.208 1.693a.79.79 0 00.084 1.019l2.237 2.237a.793.793 0 001.019.084l1.693-1.208c.929.557 1.925.971 2.974 1.235l.342 2.1a.79.79 0 00.78.662h3.164a.79.79 0 00.78-.661l.342-2.102a10.968 10.968 0 002.974-1.234l1.693 1.208a.794.794 0 001.019-.084l2.237-2.237a.79.79 0 00.084-1.02l-1.208-1.692c.557-.929.971-1.925 1.235-2.974l2.1-.342a.79.79 0 00.662-.78v-3.164a.79.79 0 00-.661-.78zM13.5 22.2c-4.798 0-8.701-3.903-8.701-8.701S8.702 4.799 13.5 4.799s8.701 3.903 8.701 8.701-3.903 8.701-8.701 8.701z"
                fill={fill}
            />
            <Path
                d="M17.154 15.7c-.871 1.062-2.177 1.755-3.654 1.755-1.477 0-2.783-.693-3.654-1.754a5.58 5.58 0 00-1.617 2.541c1.305 1.448 3.173 2.377 5.271 2.377s3.966-.929 5.27-2.377a5.58 5.58 0 00-1.616-2.541z"
                fill={fill}
            />
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
