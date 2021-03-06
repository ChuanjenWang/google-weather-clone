import React, { Component } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';

import './AreaChart.css';
import Path from './Path';
import ChartLabel from './ChartLabel';
import TimeLabel from './TimeLabel';

const Wraper = styled.div`
text-align: left;
transform: translateX(0);
${props => props.moveX !== 0 ? `transform: translateX(${props.moveX}px);` : `transform: translateX(0);`}
transition: transform .3s linear 0s;
`;

class AreaChart extends Component {

    render() {
        const margins = { top: 20, right: 0, bottom: 0, left: 0 };
        const svgDimensions = { 
            width: 2768,  // 2710 5175 
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
            <Wraper moveX={this.props.moveX}>
                <svg width={svgDimensions.width} height={svgDimensions.height}>
                    <ChartLabel 
                        scales={{ xScale, yScale }}
                        margins={margins}
                        data={this.props.data}
                        unit={this.props.unit}
                        chartLabelClicked={this.props.chartLabelClicked}
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
                           dstOffset={this.props.dstOffset}
                />
            </Wraper>
        );
    };
}

export default AreaChart;