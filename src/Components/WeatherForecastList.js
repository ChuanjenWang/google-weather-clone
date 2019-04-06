import React from 'react';
import styled from 'styled-components';
import WeatherForecastBox from './WeatherForecastBox';

const Wraper = styled.div`
display: flex;
flex-direction: row;
`;

const WeatherForecastList = (props) => {
    //console.log(props.list);
    const list = props.list.map((item, index) => {
        return (
            <WeatherForecastBox key={index} 
                                sel={index===props.sel ? 'y': 'n'} 
                                clicked={props.clicked}
                                boxIndex={index}
                                code={item.weather[0].id}
                                week={item.week}
                                tempmax={props.unit === 'C' ? 
                                            item.temp.max :
                                            item.temp.max * 1.8 + 32}
                                tempmin={props.unit === 'C' ? 
                                            item.temp.min :
                                            item.temp.min * 1.8 + 32}
                                />
        )
    })
    return (
        <Wraper>
            {list}
        </Wraper>
    )
}

export default WeatherForecastList;