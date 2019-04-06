import React from 'react';
import styled from 'styled-components';

import { getImageFromWeatherCode } from '../Util/weather';

const Wraper = styled.div`
${props => props.marginTop ? `margin-top: ${props.marginTop}px` : null}
`;
const IconImg = styled.img`
width: 48px;
height: 48px;
${props => props.width ? `width: ${props.width}px` : null}
${props => props.height ? `height: ${props.height}px` : null} 
`;

const WeatherIcon = (props) => {
    const iconName = getImageFromWeatherCode(props.code);
    const icon =  iconName ? require('../images/' + iconName): null;
    return (
        <Wraper marginTop={props.marginTop}>
            <IconImg src={icon} 
                     alt={props.des} 
                     width={props.width} 
                     height={props.height}
                    />
        </Wraper>
    )
}

export default WeatherIcon;