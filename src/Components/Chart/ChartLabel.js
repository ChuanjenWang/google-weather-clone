import React from 'react';

const ChartLabel = (props) => {
    const { scales, data } = props;
    const { yScale } = scales;
    
    const label = data.map((d, i) => {
        const degrees = props.unit === 'C' ? d.value : Math.round(d.value * 1.8 + 32);
        return (
            <text 
                  //x={xScale(d.title)}
                  x= {i * 72.1}
                  y={yScale(d.value) - 8 }
                  fontSize="11"
                  fontWeight="800"
                  fill="#b5b5b5" 
                  key={i}
            >{degrees}</text>
        )
    });

    return (
        <g>
            {label}
        </g>
    )
}

export default ChartLabel;