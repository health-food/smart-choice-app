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
            // xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 490.667 490.667"
        >
            <G fill={fill}>
                <Path d="M74.667 362.667C68.776 362.667 64 357.891 64 352V138.667C64 132.776 68.776 128 74.667 128s10.667 4.776 10.667 10.667V352c-.001 5.891-4.776 10.667-10.667 10.667zM117.333 320c-5.891 0-10.667-4.776-10.667-10.667V138.667c0-5.891 4.776-10.667 10.667-10.667S128 132.776 128 138.667v170.667c0 5.89-4.776 10.666-10.667 10.666zM160 320c-5.891 0-10.667-4.776-10.667-10.667V138.667c0-5.891 4.776-10.667 10.667-10.667s10.667 4.776 10.667 10.667v170.667c0 5.89-4.776 10.666-10.667 10.666zM202.667 320c-5.891 0-10.667-4.776-10.667-10.667V138.667c0-5.891 4.776-10.667 10.667-10.667s10.667 4.776 10.667 10.667v170.667c-.001 5.89-4.776 10.666-10.667 10.666zM245.333 362.667c-5.891 0-10.667-4.776-10.667-10.667V138.667c0-5.891 4.776-10.667 10.667-10.667S256 132.776 256 138.667V352c0 5.891-4.776 10.667-10.667 10.667zM288 320c-5.891 0-10.667-4.776-10.667-10.667V138.667c0-5.891 4.776-10.667 10.667-10.667s10.667 4.776 10.667 10.667v170.667c0 5.89-4.776 10.666-10.667 10.666zM330.667 320c-5.891 0-10.667-4.776-10.667-10.667V138.667c0-5.891 4.776-10.667 10.667-10.667s10.667 4.776 10.667 10.667v170.667c-.001 5.89-4.776 10.666-10.667 10.666zM373.333 320c-5.891 0-10.667-4.776-10.667-10.667V138.667c0-5.891 4.776-10.667 10.667-10.667S384 132.776 384 138.667v170.667c0 5.89-4.776 10.666-10.667 10.666zM416 362.667c-5.891 0-10.667-4.776-10.667-10.667V138.667c0-5.891 4.776-10.667 10.667-10.667s10.667 4.776 10.667 10.667V352c0 5.891-4.776 10.667-10.667 10.667zM117.333 362.667a8.656 8.656 0 01-4.053-.853 7.556 7.556 0 01-3.413-2.347c-4.124-3.922-4.288-10.444-.366-14.567.119-.125.241-.247.366-.366a7.535 7.535 0 013.413-2.347 10.538 10.538 0 0111.52 2.347c4.124 4.206 4.058 10.96-.149 15.084a10.671 10.671 0 01-7.318 3.049zM160 362.667a8.656 8.656 0 01-4.053-.853 7.556 7.556 0 01-3.413-2.347c-4.124-3.922-4.288-10.444-.366-14.567.119-.125.241-.247.366-.366a7.535 7.535 0 013.413-2.347 10.453 10.453 0 0111.52 2.347 7.556 7.556 0 012.347 3.413 10.052 10.052 0 010 8.107 7.463 7.463 0 01-2.347 3.413 9.987 9.987 0 01-7.467 3.2zM202.667 362.667a8.656 8.656 0 01-4.053-.853 7.556 7.556 0 01-3.413-2.347c-4.124-3.922-4.288-10.444-.366-14.567.119-.125.241-.247.366-.366a7.535 7.535 0 013.413-2.347 10.453 10.453 0 0111.52 2.347 7.556 7.556 0 012.347 3.413 10.052 10.052 0 010 8.107 7.463 7.463 0 01-2.347 3.413 9.987 9.987 0 01-7.467 3.2zM288 362.667c-5.89-.083-10.599-4.925-10.516-10.815a10.669 10.669 0 013.049-7.318c4.148-4.065 10.786-4.065 14.933 0a7.556 7.556 0 012.347 3.413 10.052 10.052 0 010 8.107 7.463 7.463 0 01-2.347 3.413 9.983 9.983 0 01-7.466 3.2zM330.667 362.667c-5.89-.083-10.599-4.925-10.516-10.815a10.664 10.664 0 013.049-7.318c4.148-4.066 10.786-4.066 14.933 0 4.124 4.206 4.058 10.96-.149 15.084a10.67 10.67 0 01-7.317 3.049zM373.333 362.667a9.984 9.984 0 01-7.467-3.2 7.45 7.45 0 01-2.347-3.413 10.052 10.052 0 010-8.107 7.53 7.53 0 012.347-3.413c4.148-4.066 10.786-4.066 14.933 0 4.124 4.206 4.058 10.96-.149 15.084a10.667 10.667 0 01-7.317 3.049z" />
            </G>
            <G fill={fill}>
                <Path d="M10.667 149.333C4.776 149.333 0 144.558 0 138.667v-64C0 68.776 4.776 64 10.667 64h64c5.891 0 10.667 4.776 10.667 10.667s-4.776 10.667-10.667 10.667H21.333v53.333c0 5.891-4.775 10.666-10.666 10.666zM74.667 426.667h-64C4.776 426.667 0 421.891 0 416v-64c0-5.891 4.776-10.667 10.667-10.667S21.333 346.109 21.333 352v53.333h53.333c5.891 0 10.667 4.776 10.667 10.667s-4.775 10.667-10.666 10.667zM480 149.333c-5.891 0-10.667-4.776-10.667-10.667V85.333H416c-5.891 0-10.667-4.776-10.667-10.667S410.109 64 416 64h64c5.891 0 10.667 4.776 10.667 10.667v64c0 5.891-4.776 10.666-10.667 10.666zM480 426.667h-64c-5.891 0-10.667-4.776-10.667-10.667s4.776-10.667 10.667-10.667h53.333V352c0-5.891 4.776-10.667 10.667-10.667s10.667 4.776 10.667 10.667v64c0 5.891-4.776 10.667-10.667 10.667z" />
            </G>
            <Path fill={fill} d="M74.667 362.667C68.776 362.667 64 357.891 64 352V138.667C64 132.776 68.776 128 74.667 128s10.667 4.776 10.667 10.667V352c-.001 5.891-4.776 10.667-10.667 10.667zM117.333 320c-5.891 0-10.667-4.776-10.667-10.667V138.667c0-5.891 4.776-10.667 10.667-10.667S128 132.776 128 138.667v170.667c0 5.89-4.776 10.666-10.667 10.666zM160 320c-5.891 0-10.667-4.776-10.667-10.667V138.667c0-5.891 4.776-10.667 10.667-10.667s10.667 4.776 10.667 10.667v170.667c0 5.89-4.776 10.666-10.667 10.666zM202.667 320c-5.891 0-10.667-4.776-10.667-10.667V138.667c0-5.891 4.776-10.667 10.667-10.667s10.667 4.776 10.667 10.667v170.667c-.001 5.89-4.776 10.666-10.667 10.666zM245.333 362.667c-5.891 0-10.667-4.776-10.667-10.667V138.667c0-5.891 4.776-10.667 10.667-10.667S256 132.776 256 138.667V352c0 5.891-4.776 10.667-10.667 10.667zM288 320c-5.891 0-10.667-4.776-10.667-10.667V138.667c0-5.891 4.776-10.667 10.667-10.667s10.667 4.776 10.667 10.667v170.667c0 5.89-4.776 10.666-10.667 10.666zM330.667 320c-5.891 0-10.667-4.776-10.667-10.667V138.667c0-5.891 4.776-10.667 10.667-10.667s10.667 4.776 10.667 10.667v170.667c-.001 5.89-4.776 10.666-10.667 10.666zM373.333 320c-5.891 0-10.667-4.776-10.667-10.667V138.667c0-5.891 4.776-10.667 10.667-10.667S384 132.776 384 138.667v170.667c0 5.89-4.776 10.666-10.667 10.666zM416 362.667c-5.891 0-10.667-4.776-10.667-10.667V138.667c0-5.891 4.776-10.667 10.667-10.667s10.667 4.776 10.667 10.667V352c0 5.891-4.776 10.667-10.667 10.667zM117.333 362.667a8.77 8.77 0 01-4.053-.853 7.611 7.611 0 01-3.413-2.347c-4.124-3.939-4.274-10.475-.335-14.598.109-.114.221-.226.335-.335a7.598 7.598 0 013.413-2.347 10.666 10.666 0 018.107 0 7.483 7.483 0 013.413 2.347c4.124 4.206 4.058 10.96-.149 15.084a10.671 10.671 0 01-7.318 3.049zM160 362.667c-5.891-.071-10.608-4.904-10.537-10.795a10.664 10.664 0 013.049-7.339 10.411 10.411 0 0111.52-2.347 7.483 7.483 0 013.413 2.347c4.124 4.206 4.058 10.96-.148 15.084a10.668 10.668 0 01-7.297 3.05zM202.667 362.667c-5.891-.071-10.608-4.904-10.537-10.795a10.664 10.664 0 013.049-7.339 7.598 7.598 0 013.413-2.347 10.538 10.538 0 0111.52 2.347c4.124 4.206 4.058 10.96-.149 15.084a10.662 10.662 0 01-7.318 3.049h.022zM288 362.667a9.348 9.348 0 01-4.053-.853 7.611 7.611 0 01-3.413-2.347c-4.124-3.939-4.274-10.475-.335-14.598.109-.114.221-.226.335-.335a7.598 7.598 0 013.413-2.347 10.666 10.666 0 018.107 0 7.483 7.483 0 013.413 2.347c4.124 4.206 4.058 10.96-.149 15.084a10.673 10.673 0 01-7.318 3.049zM330.667 362.667a9.348 9.348 0 01-4.053-.853 7.611 7.611 0 01-3.413-2.347c-4.124-3.939-4.274-10.475-.335-14.598.109-.114.221-.226.335-.335 4.148-4.066 10.786-4.066 14.933 0 4.124 3.905 4.301 10.413.397 14.536-.129.136-.261.268-.397.397a7.51 7.51 0 01-3.413 2.347 9.281 9.281 0 01-4.054.853zM373.333 362.667a9.348 9.348 0 01-4.053-.853 7.611 7.611 0 01-3.413-2.347 10.007 10.007 0 01-3.2-7.467 8.527 8.527 0 01.853-4.053 7.507 7.507 0 012.325-3.413 7.598 7.598 0 013.413-2.347 10.538 10.538 0 0111.52 2.347 7.73 7.73 0 012.347 3.413 8.532 8.532 0 01.853 4.053 10.966 10.966 0 01-10.667 10.667h.022zM10.667 149.333C4.776 149.333 0 144.558 0 138.667v-64C0 68.776 4.776 64 10.667 64h64c5.891 0 10.667 4.776 10.667 10.667s-4.776 10.667-10.667 10.667H21.333v53.333c0 5.891-4.775 10.666-10.666 10.666zM74.667 426.667h-64C4.776 426.667 0 421.891 0 416v-64c0-5.891 4.776-10.667 10.667-10.667S21.333 346.109 21.333 352v53.333h53.333c5.891 0 10.667 4.776 10.667 10.667s-4.775 10.667-10.666 10.667zM480 149.333c-5.891 0-10.667-4.776-10.667-10.667V85.333H416c-5.891 0-10.667-4.776-10.667-10.667S410.109 64 416 64h64c5.891 0 10.667 4.776 10.667 10.667v64c0 5.891-4.776 10.666-10.667 10.666zM480 426.667h-64c-5.891 0-10.667-4.776-10.667-10.667s4.776-10.667 10.667-10.667h53.333V352c0-5.891 4.776-10.667 10.667-10.667s10.667 4.776 10.667 10.667v64c0 5.891-4.776 10.667-10.667 10.667z" />
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
