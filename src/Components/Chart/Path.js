import React, { Component } from 'react';
import * as d3 from 'd3';

class Path extends Component {
    
    state = {
        fill: "#fff5ca"
    }
    
    mouseOverHandler() {
        //this.setState({ fill: "#b3ddf3" });
    }

    mouseOutHandler() {
        //this.setState({ fill: "#9ccae2" });
    }

    render() {
        const { scales, data, className, yHeight } = this.props;
        const { xScale, yScale } = scales;

        const line = d3.line()
                        .x(d=> xScale(d.title))
                        .y(d=> yScale(d.value))

        const area = d3.area()
                        .x(d=> xScale(d.title))
                        .y0(yHeight || 0)  
                        .y1(d=> yScale(d.value))
                        //.curve(d3.curveCatmullRom.alpha(0.2)) //curve 

        const newline = this.props.type ==="line" ? line(data) : area(data);
        //const newline = line(data);
        
        return (
            <g>
                <path className={className} 
                      d={newline} 
                      fill= {this.state.fill}
                      >
                </path>
            </g>
        )
    }
} 

export default Path;