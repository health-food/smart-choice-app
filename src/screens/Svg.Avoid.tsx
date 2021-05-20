import * as React from 'react';
import PropTypes from 'prop-types';
import Svg, { Path, G } from 'react-native-svg';
import { useTheme } from 'react-navigation';
import colors from "../constants/colors";

const SvgAvoid = ({active} : any) => {
    const theme = useTheme();
    const fill = active
        ? colors.activeTintColor[theme]
        : colors.inactiveTintColor[theme];

    return (
        <Svg
            width={40}
            height={40}
            viewBox="0 0 31 23"
            fill="none"
        >
            <G clipPath="url(#prefix__clip0)">
                <Path
                    d="M18.98 10.857l-8.463 10.857C4.709 21.714 0 16.854 0 10.857 0 4.861 4.708 0 10.517 0l8.462 10.857z"
                    fill="#FF7C48"
                />
                <Path
                    d="M10.517 0c5.808 0 10.517 4.86 10.517 10.857 0 5.996-4.709 10.857-10.517 10.857V0z"
                    fill="#FF415B"
                />
                <Path
                    d="M4.764 6.83l1.851-1.912 4.828 4.984 2.158 4.14-4.01-2.229L4.764 6.83z"
                    fill="#F5F2F1"
                />
                <Path
                    d="M16.27 14.885l-1.852 1.912-4.827-4.984 1.852-1.912 4.827 4.984z"
                    fill="#DBD1CC"
                />
                <Path
                    d="M6.615 16.797l-1.851-1.912L9.59 9.9l4.01-2.228-2.158 4.14-4.828 4.984z"
                    fill="#F5F2F1"
                />
                <Path
                    d="M14.418 4.917L16.27 6.83l-5.753 5.944-.008-3.82 3.909-4.036z"
                    fill="#DBD1CC"
                />
            </G>
        </Svg>
);
};

SvgAvoid.defaultProps = {
    active: false,
    size: 30
};

SvgAvoid.propTypes = {
    // optional
    active: PropTypes.bool,
    size: PropTypes.number
};

export default SvgAvoid;
