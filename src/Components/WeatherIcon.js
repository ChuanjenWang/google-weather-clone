import React from 'react';
import styled from 'styled-components';

import { getImageFromWeatherCode } from '../Util/weather';

const Wraper = styled.div`
margin-top: -5px;
width: 64px;
height: 64px;
border: none;
`;
const IconImg = styled.img`
width: 64px;
height: 64px;
`;

const WeatherIcon = (props) => {
    const iconName = getImageFromWeatherCode(props.code);
    const icon =  iconName ? require('../images/' + iconName): null;//iconPath ? require(iconPath) : null;
  
    return (
        <Wraper>
            <IconImg src={icon} alt={props.des}  />
        </Wraper>
    )
    // require('../images/partly_cloudy.png')
}

export default WeatherIcon;