import React from 'react';
import styled from 'styled-components';

const Wraper = styled.div`
padding-left: 15px;
display: flex;
align-items: flex-begin;
`;
const DegreeNumber = styled.span`
font-size: 64px;
font-weight: 400;
margin-top: -14px;
`;
const DegreeUnits = styled.div`
padding-left: 2px;
`;
const DegreeUnit = styled.span`
display: inline-block;
${props => props.canClick === 'Y' ? `
cursor: pointer;
`: null
}
`;

const WeatherDegrees = (props) => {
    const degrees = props.degrees ? props.degrees : null;
    const unit = props.unit ? props.unit : null;
    const reverseUnit = props.unit === 'C' ? 'F' : 'C';
    return (
        <Wraper>
            <DegreeNumber>{degrees}</DegreeNumber>
            <DegreeUnits>
                <DegreeUnit unit={unit} 
                            canClick="N"
                            onClick={props.clicked.bind(this, unit)}>°{unit}</DegreeUnit> 
                &nbsp;|&nbsp; 
                <DegreeUnit unit={reverseUnit} 
                            canClick="Y"
                            onClick={props.clicked.bind(this, reverseUnit)}>°{reverseUnit}</DegreeUnit>
            </DegreeUnits>
        </Wraper>
    )
}

export default WeatherDegrees;
