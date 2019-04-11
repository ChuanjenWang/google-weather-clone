import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components'
import * as _ from 'lodash';

import * as actions from '../store/actions/index';

const Wraper = styled.div`
background: #fff;
display: flex;
border: 1px solid #dfe1e5;
box-shadow: none;
width: 630px;
border-radius: 24px;
z-index: 3;
height: 44px;
margin: 0 auto;

:hover {
    box-shadow: 0 1px 6px 0 rgba(32,33,36,0.28);
    border-color: rgba(223,225,229,0);
}

${props => props.status === 'open' ? 
`border-bottom-left-radius: 0;
border-bottom-right-radius: 0;
box-shadow: 0 1px 6px 0 rgba(32,33,36,0.28);
border-color: rgba(223,225,229,0);
` : null 
}

`;

const WraperText = styled.div`
flex: 1;
display: flex;
padding: 5px 4px 0 16px;
padding-left: 20px;
`;

const WraperIcon = styled.button`
border-radius: 0 8px 8px 0;
outline: none;
flex: 0 0 auto;
padding-right: 13px;

height: 46px;
width: 44px;
background: transparent;
border: none;
cursor: pointer;
padding-left: 0;
`;

const WraperIconInner = styled.div`
color: #4285f4;
height: 24px;
width: 24px;
margin: auto;
`;

const WraperIconInnerSVG = styled.div`
display: inline-block;
fill: currentColor;
height: 24px;
line-height: 24px;
position: relative;
width: 24px;
`;

const SearchInput = styled.input`
background-color: transparent;
border: none;
margin: 0;
padding: 0;
color: rgba(0,0,0,.87);
word-wrap: break-word;
outline: none;
display: flex; 
flex: 100%;     
font: 16px arial,sans-serif;
line-height: 34px;
height: 34px !important;
`;

const SuggestionPanel = styled.div`
position: relative;
width: 630px;
margin: 0 auto;

${props => props.status === 'open' ? 
 `opacity: 1;`: 
 `opacity: 0;`
}
`;

const SuggestionPanelInner = styled.div`
width: 630px;
height: 120px;
position: absolute;
top: 0px;
border: 0.5px solid #dfe1e5;
z-index: 10;
background: #fff;
border-radius: 0 0 24px 24px;
box-shadow: 0 4px 6px 0 rgba(32,33,36,0.28);
overflow: hidden;
border-color: rgba(223,225,229,0);
padding-buttom: 4px;

 ul {
    line-height: 22px;
    list-style: none;
    text-align: left;
    padding: 0;
    margin: 0;

    li {
        padding: 0;
    }
 }

`;

const LiWraper = styled.div`
${props => props.selw === 't' ? 
`background: #efefef
`: 
`background: white`
}
`;

const SuggestionPanelInnerContainer = styled.div`
margin-left: 20px;
margin-right: 20px;
flex: auto;
${props => props.index === 0 ? 
 `border-top: 1px solid #dfe1e5;
 padding-top: 4px;
 ` : null
}
`

class Search extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            value: '',
            extend: false,
            selectedLi: -1,
            lat: '',
            lng: ''
        }
        this.dispatchChangedHandler = _.debounce(this.props.onFetchSuggestions, 250);
        //this.onClickHandler = this.onClickHandler.bind(this);
    }

    bindDefaultCity = () => {
        const cityId = '1668341'; //Taipei
        //const lat = '25.0375';    //Taipei
        //const lng = '121.5637'; {3}//Taipei
        
        this.props.onFetchWeathers(cityId);
        //this.props.onFetchTimeZone(lat, lng);
    }
    
    onChangedHandler = (e) => {
        this.setState({ value: e.target.value});
        //_.debounce(this.props.onFetchSuggestions(e.target.value), 500);
        //console.log(e.target.value);
        this.dispatchChangedHandler(e.target.value);
    }

    onFocusHandler = (e) => {
        //this.props.onFocus();
        if(this.props.suggestions.length > 0) {
            this.setState({ extend: true });
        }
    }

    onBlurHandler = (e) => {
        //this.props.on;
        this.setState({ extend: false});
    }

    onMouseoverHandler = (index) => {
        if (this.state.extend) {
            this.setState({
                selectedLi : index,
                value: this.props.suggestions[index].cityName + ', ' + 
                       this.props.suggestions[index].country
            });
        }
    }

    onClickHandler = (e) => {
        let key = e.currentTarget.getAttribute('data-param');
              
        if(this.state.selectedLi.toString() === key) {
        let tmpCity = this.props.suggestions[this.state.selectedLi];
        
        this.props.onFetchWeathers(tmpCity.cityCode);
        //this.props.onFetchTimeZone(tmpCity.lat, tmpCity.lng);
        this.props.onSetCityInfo(tmpCity.country, tmpCity.state);
        this.setState({ extend: false});
        }
    }

    onQueryButtonClickHandler = (e) => {
        //console.log(this.state.value);
        if (this.state.value) {
            this.props.onFetchWeathers(this.state.value, 'name');
            //this.props.onFetchTimeZone(this.props.lat, this.props.lng);
            this.setState({ extend: false});
        }
    }

    onKeyDownHandler = (e) => {
        //console.log('e.target.value:' + e.target.value);
        //console.log('this.props.suggestions.length:' + this.props.suggestions.length);
        if(e.target.value !== this.props.value && this.props.suggestions.length > 0) {
            this.setState({ extend: true});
        }
        if (e.which === 40) {    
            if(this.state.selectedLi <=3) {
                this.setState(prevState => ({
                    selectedLi : prevState.selectedLi + 1,
                    value: this.props.suggestions[prevState.selectedLi + 1].countryCode === 'TW' ? 
                           this.props.suggestions[prevState.selectedLi + 1].cityName :
                           this.props.suggestions[prevState.selectedLi + 1].cityName + ', ' +
                           this.props.suggestions[prevState.selectedLi + 1].countryCode
                }));
            } else {
                this.setState({
                    selectedLi : 0,
                    value: this.props.suggestions[0].cityName
                });
            }
        } else if (e.which === 38) {
            if(this.state.selectedLi >=1) {
                this.setState(prevState => ({
                    selectedLi : prevState.selectedLi - 1,
                    value: this.props.suggestions[prevState.selectedLi - 1].cityName
                }));
            } else {
                this.setState({
                    selectedLi : 4,
                    value: this.props.suggestions[4].cityName
                });
            }
        }
        if(e.which === 13 || e.keyCode === 13) {
            let cityName = e.target.value;

            if (this.state.selectedLi !== -1) {
                let tmpCity = this.props.suggestions[this.state.selectedLi];
                
                this.props.onFetchWeathers(tmpCity.cityCode);
                //this.props.onFetchTimeZone(tmpCity.lat, tmpCity.lng);
                this.props.onSetCityInfo(tmpCity.country, tmpCity.state);
               
                this.setState({ extend: false});
            }
            else if (cityName) {
                this.props.onFetchWeathers(cityName, 'name');
                //this.props.onFetchTimeZone(this.props.lat, this.props.lng);
                this.setState({ extend: false});
            }
        }
    }
  
    componentDidMount() {
        this.bindDefaultCity();
        this.nv.addEventListener('keydown', this.onKeyDownHandler);
        //this.setState({ extend: true });
    }

    componentWillUnmount() {
        this.nv.removeEventListener('keydown', this.onKeyDownHandler);
    }

    render() {    
        //console.log('this.props.suggestions:' + this.props.suggestions);
        //const autoList = this.props.suggestions.length ? this.props.suggestions : null;
        //console.log('this.props.suggestions.length:' + this.props.suggestions.length);
        const autoPanel = this.props.suggestions.length ? this.props.suggestions.map((item, key)=> {
            return (
                <li key={key} onClick={(e) => this.onClickHandler(e)} data-param={key}>
                    <LiWraper selw={ this.state.selectedLi === key ? 't': 'f'} 
                              onMouseOver={(this.onMouseoverHandler.bind(this, key))}
                              index={key}>
                    <SuggestionPanelInnerContainer index={key}>
                        <span>{item.cityName + ', ' + item.country}
                        </span>
                    </SuggestionPanelInnerContainer>
                    </LiWraper>
                </li>
            )
        }): null;

        return (
            <div>
                <Wraper status={this.state.extend ? 'open' : 'close'}>
                    <WraperText>
                        <SearchInput value={this.state.value} 
                                     onChange={this.onChangedHandler}
                                     onFocus={this.onFocusHandler} 
                                     onBlur={this.onBlurHandler}
                                     ref={elem => this.nv = elem}
                                     />  
                    </WraperText>
                    <WraperIcon onClick={this.onQueryButtonClickHandler}>
                        <WraperIconInner>
                            <WraperIconInnerSVG>
                                <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z">
                                    </path>
                                </svg>
                            </WraperIconInnerSVG>
                        </WraperIconInner>
                    </WraperIcon>
                </Wraper>
                <SuggestionPanel status={this.state.extend ? 'open' : 'close'}>
                    <SuggestionPanelInner status={this.state.extend ? 'open' : 'close'} >
                        <div></div>
                        <ul>{autoPanel}</ul>
                    </SuggestionPanelInner>
                </SuggestionPanel>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        query: state.search.query,
        suggestions: state.search.suggestions,
        showSuggestions: state.search.showSuggestions,
        lat: state.weather.lat,
        lng: state.weather.lng
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchSuggestions: (term) => dispatch(actions.fetchSuggestions(term)),
        onFetchWeathers: (param, type) => dispatch(actions.fetchWeathers(param, type)),
        onFetchTimeZone: (lat, lng) => dispatch(actions.fetchTargetCityLocalTime(lat, lng)),
        onSetCityInfo: (country, state) => dispatch(actions.setCurrentCityInfo(country, state)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);