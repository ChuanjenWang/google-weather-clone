import React from 'react';
import styled from 'styled-components';

const Wraper = styled.div`
    height: 36px
    width: 2808px    
    display: flex;
    flex-direction: row;
`;

const Box = styled.div`
    height: 24px
    width: 73px;
    color: #bdbdbd;
    font-size: 12px;
    font-weight: 700;
    margin-top: 12px;
    text-align: center;
`;

const TimeLabel = (props) => {
    const { data } = props;
    const timeBox = data.map((d, i) => {
        const dt = new Date(d.title * 1000);
        const tmpHour = dt.getHours();
        const label = tmpHour <= 12 ? tmpHour + 'AM': tmpHour - 12 + 'PM' ;
        return (
            <Box key={i}>
                {label}
            </Box>
        )
    });
    
    return (
        <Wraper width={props.width}>
            {timeBox}
        </Wraper>
    )
}

export default TimeLabel;