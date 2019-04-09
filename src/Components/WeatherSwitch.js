import React from 'react';
import styled from 'styled-components';

const Wraper = styled.div`
padding: 15px 0px 9px 0px;
text-align: left;
`
const ButtonWraper = styled.div`
display: inline-block;
border: 1px solid rgba(0,0,0,0.1);
border-radius: 2px;
font-size: 11px;
font-weight: 800;
height: 29px;
line-height: 27px;
margin: 2px 0;
min-width: 54px;
padding: 0 15px 10px 15px;
cursor: pointer;

background-color: #f5f5f5;
color: #444;

:hover {
    border: 1px solid #c6c6c6;
    box-shadow: 0 1px 1px rgba(0,0,0,0.1);
}

${props => (props.type ==='cloud' || props.type ==='wind') ? 
`margin-left: -1px;` : null}

${props => (props.type ==='cloud') ? 
`border-radius: 0px;` : null}

${props => (props.sel === 'y') ? `
box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
background-color: #eee;
background-image: -webkit-linear-gradient(top,#eee,#e0e0e0);
color: #222;`
: null}
`

const WeatherSwitch = () => {
    return (
        <Wraper>
            <ButtonWraper type="temp" sel="y">
                Tempature
            </ButtonWraper>
            <ButtonWraper type="cloud">
                Clouds
            </ButtonWraper>
            <ButtonWraper type="wind">
                Wind
            </ButtonWraper>
        </Wraper>
    )
}

export default WeatherSwitch;