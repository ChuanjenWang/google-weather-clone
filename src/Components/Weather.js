import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import moment from 'moment';

import { getWeekandTime, 
         convertDegrees, 
         getWeekName, 
         formatWeathersDegreesChart,
         getCurrentPeriod } from '../Util/weather';
import { UpperPrefix } from '../Util/text';
import WeatherInfo from './WeatherInfo';
import WeatherIcon from './WeatherIcon';
import WeatherDegrees from './WeatherDegrees';
import WeatherMoreInfo from './WeatherMoreInfo';
import WeatherSwitch from './WeatherSwitch';
import WeatherForecastList from './WeatherForecastList';
import AreaChart from './Chart/AreaChart';
import Loader from './UI/loader';

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

const WraperLoading = styled.div`
display: block;
${props => props.loading ? null : `
display: none;
`}
position: absolute;
top: 50%;
left: 45%;
transform: translateX(-40%);
transform: translateY(-50%);
`;

const WrpaerInner = styled.div`
padding: 20px 16px 24px 16px;
flex:1;
flex-direction: column;
align-content: space-between;
display: flex;
${props => props.loading ? `
display: none;` :
 null}
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
flex-direction: column;
justify-content: flex-start;
`; 

const AreaChartWraper = styled.div`
width: 596px;
overflow: hidden;
`
const AreaCharNoData = styled.div`
color: #878787 !important;
font-weight: 600;
letter-spacing: -1px;
height: 60px;
width: 100%;
text-align: center;
`

class Weather extends Component {
    constructor(props) {
        super(props);

        this.state = {
            city: '',
            unit: 'C',
            selForecastIndex: -1,
            selHourIndex: 0,
            displayDt: '',
            displayDes: '',
            displayCode: '',
            displayDeg: '',
            clouds: '',
            humidity: '',
            wind: '',
            moveX: 0,
            loading: false
        }
    }

    onChangeUnitHandler = (unit) => {
        if (unit !== this.state.unit) {
            this.setState({unit})
        }
    }

    onSelectForecastHandler = (index) => {
        // 68px per period
        const currentPeriod = getCurrentPeriod();
        const threeHours = -72;
        let moveX = 0;

        //moveX = index * threeHours;
        if(index === 1) {
            moveX = (8 - currentPeriod) * threeHours;
        } else if (index >1 && index < 5) {
            moveX = (8 - currentPeriod) * threeHours + (threeHours * 8 - 0.5) * (index -1);
        }
        
        this.setState({
            selForecastIndex: index,
            displayDt: getWeekName(this.props.weathersDaily[index].weekIndex),
            displayDes: this.props.weathersDaily[index].weather[0].description,
            displayCode: this.props.weathersDaily[index].weather[0].id,
            displayDeg: this.props.weathersDaily[index].temp.day,
            clouds: this.props.weathersDaily[index].clouds,
            humidity: this.props.weathersDaily[index].humidity,
            wind: this.props.weathersDaily[index].speed,
            moveX
        });
    }

    onChartLabelClickedHandler = (index) => {
        const dtM = moment(this.props.weathers[index].dt * 1000);
        
        dtM.utc();
        dtM.add(this.props.dstOffset - 1,'h');
        
        const displayDt = dtM.format("dddd h:mm A"); //getWeekandTime(dt.toDateString() + ' ' + dt.toTimeString());
        const displayDes = this.props.weathers[index].weather[0].description;
        const displayCode = this.props.weathers[index].weather[0].id; 
        const displayDeg = Math.round(this.props.weathers[index].main.temp - 273.15);
        const clouds = this.props.weathers[index].clouds ? this.props.weathers[index].clouds.all : '0';
        const humidity = this.props.weathers[index].main.humidity;
        const wind = this.props.weathers[index].wind ? this.props.weathers[index].wind.speed : '0';

        this.setState({
            selHourIndex: index,
            displayDt, 
            displayDes,
            displayCode,
            displayDeg,
            clouds,
            humidity,
            wind,
        });
    }

    getDisplayTime = () => {
        return this.state.selForecastIndex < 0 && this.state.selHourIndex === 0 ? 
            getWeekandTime(this.props.currentDt) : 
            this.state.displayDt;
    }

    getDescription = () => {
        if (this.state.selForecastIndex < 0 && this.state.selHourIndex === 0 ) {
            return this.props.weathers.length > 0 ? UpperPrefix(this.props.weathers[0].weather[0].description) : null;
        } else {
            return UpperPrefix(this.state.displayDes);
        }
    }

    getDegrees = () => {
        if (this.state.selForecastIndex < 0 && this.state.selHourIndex === 0) {
            return this.props.weathers.length > 0 ? convertDegrees(this.state.unit, this.props.weathers[0].main.temp) : null;
        } else {
            return this.state.unit === 'C' ? Math.round(this.state.displayDeg) : 
                    Math.round(Math.round(this.state.displayDeg) * 1.8 + 32);
        }
    }

    getWeatherCode = () => {
        if (this.state.selForecastIndex < 0 && this.state.selHourIndex === 0) {
            return this.props.weathers.length > 0 ? this.props.weathers[0].weather[0].id: null;
        } else {
            return this.state.displayCode;
        }
    }

    getHumidity = () => {
        if (this.state.selForecastIndex < 0 && this.state.selHourIndex === 0) {
            return this.props.weathers.length > 0 ? this.props.weathers[0].main.humidity: null;;
        } else {
            return this.state.humidity;
        }
    }

    getClouds = () => {
        if (this.state.selForecastIndex < 0 && this.state.selHourIndex === 0) {
            return this.props.weathers.length > 0 ? this.props.weathers[0].clouds.all: null;
        } else {
            return this.state.clouds;
        }
    }

    getWind = () => {
        if (this.state.selForecastIndex < 0 && this.state.selHourIndex === 0) {
            return this.props.weathers.length > 0 ? this.props.weathers[0].wind.speed: null;
        } else {
            return this.state.wind;
        }
    }
    getDisplayCityName = () => {
        let result = '';

        if (this.props.countryCode === 'US') {
            if (this.props.state) {
                result = `${this.props.city}, ${this.props.state}, USA`;
            } else {
                result = `${this.props.city}, USA`;
            }
        } else if (this.props.countryCode === 'TW') {
            result = `${this.props.city}`;
        } else {
            result = this.props.country ? `${this.props.city}, ${this.props.country}` : `${this.props.city}, ${this.props.countryCode}`;
        }
        
        return result;
    }

    renderAreaChart = () => {
        if (this.state.selForecastIndex >= -1 && this.state.selForecastIndex <= 4) {
            return (
                <AreaChart moveX={this.state.moveX}
                           data={formatWeathersDegreesChart(this.props.weathers)} 
                           unit={this.state.unit}
                           chartLabelClicked={this.onChartLabelClickedHandler}
                           dstOffset={this.props.dstOffset}/>
            )
        } else {
            return (
                <div>
                    <AreaCharNoData>
                        No hourly forecast available.
                    </AreaCharNoData>
                </div>
            )
        }
    }

    componentDidUpdate() {
        if (this.state.loading && this.props.weathers.length) {
            this.setState({loading: false});
        }

        if (!this.state.city && this.props.state) {
            this.setState({city: this.props.city})
        }

        if (this.props.city !== this.state.city) {
            this.setState({
                city: this.props.city,
                unit: 'C',
                selForecastIndex: -1,
                displayDt: '',
                displayDes: '',
                displayCode: '',
                displayDeg: '',
                clouds: '',
                humidity: '',
                wind: ''
            });
        }
    }

    componentDidMount() {
        if (!this.props.weathers.length) {
            this.setState({loading: true});
        } 
    }

    render() {
        const displayTime = this.getDisplayTime();
        const description = this.getDescription();
        const degrees = this.getDegrees();
        const code = this.getWeatherCode();
        const humidity = this.getHumidity();
        const clouds = this.getClouds();
        const wind = this.getWind();
        const displayCity = this.getDisplayCityName();
        
        return (
            <div>
                <Wraper>
                    <WraperLoading loading={this.state.loading}>
                        <Loader />
                    </WraperLoading>
                    <WrpaerInner loading={this.state.loading}>
                        <WeatherInfo city={displayCity} 
                                     displayTime={displayTime}
                                     description={description}/>
                        <WeatherDetails>
                            <WeatherDetailsLeft>
                                     <WeatherIcon code={code}
                                                  des={description}
                                                  width="64"
                                                  height="64"
                                                  marginTop="-5"/>
                                     <WeatherDegrees unit={this.state.unit} 
                                                     degrees={degrees}
                                                     clicked={(unit) => this.onChangeUnitHandler(unit)} /> 
                            </WeatherDetailsLeft>
                           <WeatherDetailsRight>
                               <WeatherMoreInfo humidity={humidity}
                                                wind={wind}
                                                clouds={clouds}
                                                />
                                <WeatherSwitch />
                           </WeatherDetailsRight>
                        </WeatherDetails>
                        <AreaChartWraper>
                            {/* <AreaChart moveX={this.state.moveX}
                                       data={formatWeathersDegreesChart(this.props.weathers)} /> */}
                            {this.renderAreaChart()}
                        </AreaChartWraper>
                        <WeatherForecastList sel={this.state.selForecastIndex}
                                             clicked={this.onSelectForecastHandler}
                                             list={this.props.weathersDaily}
                                             unit={this.state.unit}
                        />
                    </WrpaerInner>
                </Wraper>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        city: state.weather.city,
        countryCode: state.weather.country,
        country: state.search.currentCountry,
        state: state.search.currentState,
        weathers: state.weather.weathers,
        weathersDaily: state.weather.weathersDaily,
        currentDt: state.geo.localdt,
        dstOffset: state.geo.dstOffset,
    }
}

export default connect(mapStateToProps)(Weather);