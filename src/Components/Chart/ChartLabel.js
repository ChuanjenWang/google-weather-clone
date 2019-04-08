import React from 'react';

const ChartLabel = (props) => {
    const { scales, data } = props;
    const { xScale, yScale } = scales;
    
    const label = data.map((d, i) => {
        return (
            <text x={xScale(d.title)}
                  y={yScale(d.value) - 8 }
                  fontSize="11"
                  fontWeight="800"
                  fill="#b5b5b5" 
                  key={i}
            >{d.value}</text>
        )
    });

    return (
        <g>
            {label}
        </g>
    )
}

export default ChartLabel;