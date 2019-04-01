import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import WeatherInfo from './WeatherInfo';
import { getWeekandTime } from '../Util/weather';
import { UpperPrefix } from '../Util/text';


const Wraper = styled.div`
width: 632px;
height: 466px;
border: 1px solid #dfe1e5;
border-radius: 8px;
display: flex;
background: #fff;
box-shadow: none;
margin: 0 auto;
`;

const WrpaerInner = styled.div`
padding: 20px 16px 24px 16px;
`;

class Weather extends Component {
    render() {
        const displayTime = this.props.weathers.length > 0 ? getWeekandTime() : null;
        const description = this.props.weathers.length > 0 ? UpperPrefix(this.props.weathers[0].weather[0].description) : null;
        return (
            <div>
                <Wraper>
                    <WrpaerInner>
                        <WeatherInfo city={this.props.city} 
                                     displayTime={displayTime}
                                     description={description}/>
                    </WrpaerInner>
                </Wraper>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        city: state.weather.city,
        weathers: state.weather.weathers
    }
}

export default connect(mapStateToProps)(Weather);