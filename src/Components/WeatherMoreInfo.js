import React from 'react';
import styled from 'styled-components';

const Wraper = styled.div`
//border: 1px solid #eee;
width: 262px; 
//font: 16px arial, helvetica,sans-serif;
font-size: 16px;
font-weight: 600;
color: #878787;
text-align: left;
line-height: 22px;
margin-top: -5px;
letter-spacing: -0.5px;
`;

const WeatherMoreInfo = (props) => {
    if(!props) return null;
    return (
        <Wraper>
            <div>
                Clouds:&nbsp; 
                <span>{props.clouds}%</span>
            </div>
            <div>
                Humidity:&nbsp; 
                <span>{props.humidity}%</span>
            </div>
            <div>
                Wind:&nbsp; 
                <span>{(props.wind * 3.6).toFixed(2)} km/h</span>
            </div>
        </Wraper>
    );
}

export default WeatherMoreInfo;