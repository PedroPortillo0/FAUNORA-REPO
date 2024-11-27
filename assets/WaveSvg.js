import React from 'react';
import Svg, { Path } from 'react-native-svg';

const WaveSvg = ({ color }) => (
    <Svg height="100" width="100%" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <Path
            fill={color}
            d="M0,64L48,85.3C96,107,192,149,288,176C384,203,480,213,576,213.3C672,213,768,203,864,176C960,149,1056,107,1152,106.7C1248,107,1344,149,1392,170.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
    </Svg>
);


export default WaveSvg;