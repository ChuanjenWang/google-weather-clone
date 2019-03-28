import React from 'react';
import styled from 'styled-components';

const Wraper = styled.div`
font-size: 16px;
font-weight: 600;
color: #878787;
text-align: left;

`;

const CityTitle = styled.div`
font-size: 24px;
font-weight: 600;
`;

const Details = styled.div`
`;

const WeatherInfo = () => {
    return (
        <Wraper>
            <CityTitle>San Jose, CA, USA</CityTitle>
            <Details>
                <div>Thursday 10:00 AM</div>
                <div>Mostly Sunny</div>
            </Details>
        </Wraper>
    )
}

export default WeatherInfo;