import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { getWeekandTime, convertDegrees } from '../Util/weather';
import { UpperPrefix } from '../Util/text';
import WeatherInfo from './WeatherInfo';
import WeatherIcon from './WeatherIcon';
import WeatherDegrees from './WeatherDegrees';
import WeatherMoreInfo from './WeatherMoreInfo';


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
flex:1;
`;

const WeatherDetails = styled.div`
padding-top: 30px;
display: flex;
flex: 1;
justify-content: space-between; 
align-item: flex-start;
`;
const WeatherDetailsLeft = styled.div`
display: flex;
`;

const WeatherDetailsRight = styled.div`
display: flex;
`; 

class Weather extends Component {
    constructor(props) {
        super(props);

        this.state = {
            unit: 'C'
        }
    }

    onChangeUnitHandler = (unit) => {
        if (unit !== this.state.unit) {
            this.setState({
                unit
            })
        }
    }

    render() {
        const displayTime = getWeekandTime(this.props.currentDt);
        const description = this.props.weathers.length > 0 ? UpperPrefix(this.props.weathers[0].weather[0].description) : null;
        const degrees = this.props.weathers.length > 0 ? convertDegrees(this.state.unit, this.props.weathers[0].main.temp) : null;
        const code = this.props.weathers.length > 0 ? this.props.weathers[0].weather[0].id: null;
        const humidity = this.props.weathers.length > 0 ? this.props.weathers[0].main.humidity: null;
        const clouds = this.props.weathers.length > 0 ? this.props.weathers[0].clouds.all: null;
        const wind = this.props.weathers.length > 0 ? this.props.weathers[0].wind.speed: null;
        
        return (
            <div>
                <Wraper>
                    <WrpaerInner>
                        <WeatherInfo city={this.props.city} 
                                     displayTime={displayTime}
                                     description={description}/>
                        <WeatherDetails>
                            <WeatherDetailsLeft>
                                     <WeatherIcon code={code}
                                                  des={description}/>
                                     <WeatherDegrees unit={this.state.unit} 
                                                     degrees={degrees}
                                                     clicked={(unit) => this.onChangeUnitHandler(unit)} /> 
                            </WeatherDetailsLeft>
                           <WeatherDetailsRight>
                               <WeatherMoreInfo humidity={humidity}
                                                wind={wind}
                                                clouds={clouds} />
                           </WeatherDetailsRight>
                        </WeatherDetails>
                    </WrpaerInner>
                </Wraper>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        city: state.weather.city,
        weathers: state.weather.weathers,
        currentDt: state.geo.localdt
    }
}

export default connect(mapStateToProps)(Weather);