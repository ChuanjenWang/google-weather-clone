import React, { Component } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';

import './AreaChart.css';
import Path from './Path';
import ChartLabel from './ChartLabel';
import TimeLabel from './TimeLabel';

const Wraper = styled.div`
text-align: left;
`;

class AreaChart extends Component {

    render() {
        const margins = { top: 20, right: 0, bottom: 0, left: 0 };
        const svgDimensions = { 
            width: 2710,  //5175 
            height: 80 //Math.max(this.props.wraperHeight, 300) 
        };
        const maxValue = Math.max(...this.props.data.map(d => d.value));
        const minValue = Math.min(...this.props.data.map(d => d.value));
        
        // scaleBand type
        const xScale = d3.scaleBand()
        .paddingInner(1)
        .domain(this.props.data.map(d => d.title))
        .range([margins.left, svgDimensions.width - margins.right])        

        // scaleLinear type
        const yHeight = svgDimensions.height - margins.bottom;
        const yScale = d3.scaleLinear()
        //.domain([0, maxValue])
        .domain([minValue - 1, maxValue])
        .range([yHeight, margins.top])
        
        return (
            <Wraper>
                <svg width={svgDimensions.width} height={svgDimensions.height}>
                    <ChartLabel 
                        scales={{ xScale, yScale }}
                        margins={margins}
                        data={this.props.data}
                    />
                    <Path className="area" 
                        type="area"
                        scales={{ xScale, yScale }}
                        margins={margins}
                        yHeight={yHeight}
                        data={this.props.data}
                    /> 
                    <Path className="line" 
                        type="line"
                        scales={{ xScale, yScale }}
                        margins={margins}
                        yHeight={yHeight}
                        data={this.props.data}
                    /> 
                </svg>
                <TimeLabel width={svgDimensions.width}
                           data={this.props.data}
                />
            </Wraper>
        );
    };
}

export default AreaChart;