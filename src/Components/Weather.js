import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import WeatherInfo from './WeatherInfo';



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
        return (
            <div>
                <Wraper>
                    <WrpaerInner>
                        <WeatherInfo city={this.props.city}/>
                    </WrpaerInner>
                </Wraper>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        city: state.weather.city
    }
}

export default connect(mapStateToProps)(Weather);