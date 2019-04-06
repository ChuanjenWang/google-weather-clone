import React from 'react';
import styled from 'styled-components';
import WeatherIcon from './WeatherIcon';

const Wraper = styled.div`
//border: 1px solid #eee;
width: 75px;
height: 92px;
color: #bababa;
font-size: 13px;
font-weight: 600;
cursor: pointer;
${props => props.selected === 'y' ? `
border: 1px solid #e9e9e9;
background-color: #fcfcfc;
border-raduis: 1px;
margin:0;
` : null}
`;
const BoxTitle = styled.div`
padding-top 7px;
line-height: 15px;
`;
const BoxImage = styled.div`
width: 56px;
height: 51px;
margin: 0 auto;
`;
const BoxDegreesHigh = styled.span`
padding-right: 5px;
color: #878787;
`;
const BoxDegreesLow = styled.span`
`;

const WeatherForecastBox = (props) => {
    return (
        <Wraper selected={props.sel} onClick={() => props.clicked(props.boxIndex)}>
            <BoxTitle>
                {props.week}
            </BoxTitle>
            <BoxImage>
                <WeatherIcon code={props.code} />
            </BoxImage>
            <div>
                <BoxDegreesHigh>{Math.round(props.tempmax)}°</BoxDegreesHigh>
                <BoxDegreesLow>{Math.round(props.tempmin)}°</BoxDegreesLow>
            </div>
        </Wraper>
    )
}
export default WeatherForecastBox;