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
${props => props.status === 'open' ? 
 `display: block`
 : 
 `display: none`
}
`;

const LiWraper = styled.div`
${props => props.selw === 't' ? 
`background: #efefef
`

: 
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
 `
 : 
 null
}
`

class Search extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            value: '',
            extend: false,
            selectedLi: -1
        }
        this.dispatchChangedHandler = _.debounce(this.props.onFetchSuggestions, 300);
    }
    
    onChangedHandler = (e) => {
        this.setState({ value: e.target.value});
        //_.debounce(this.props.onFetchSuggestions(e.target.value), 500);
        //console.log(e.target.value);
        this.dispatchChangedHandler(e.target.value);
    }

    onFocusHandler = (e) => {
        //this.props.onFocus();
        this.setState({ extend: true });
    }

    onBlurHandler = (e) => {
        //this.props.on;
        this.setState({ extend: false});
    }

    onMouseoverHandler = (index) => {
        this.setState({selectedLi : index});
    }

    onKeyDownHandler = (e) => {
        if (e.which === 40) {    
            if(this.state.selectedLi <=3) {
                this.setState(prevState => ({
                    selectedLi : prevState.selectedLi + 1
                }));
            } else {
                this.setState({selectedLi : 0});
            }
        } else if (e.which === 38) {
            if(this.state.selectedLi >=1) {
                this.setState(prevState => ({
                    selectedLi : prevState.selectedLi - 1
                }));
            } else {
                this.setState({selectedLi : 4});
            }
        }
    }

    onSearchEnterHandler = () => {
        
    }

    componentDidMount() {
        this.nv.addEventListener('keydown', this.onKeyDownHandler);
    }

    componentWillUnmount() {
        this.nv.removeEventListener('keydown', this.onKeyDownHandler);
    }

    render() {    
        const autoList = this.state.extend ? this.props.suggestions : null;
        const autoPanel = autoList ? autoList.map((item, key)=> {
            return (
                <li key={key} >
                    <LiWraper selw={ this.state.selectedLi === key ? 't': 'f'} 
                              onMouseOver={(this.onMouseoverHandler.bind(this, key))}
                              index={key}>
                    <SuggestionPanelInnerContainer index={key}>
                        <span>{item}
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
                                     ref={elem => this.nv = elem}/>
                    </WraperText>
                    <WraperIcon>
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
                <SuggestionPanel>
                    <SuggestionPanelInner status={this.state.extend ? 'open' : 'close'}>
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
        query: state.query,
        suggestions: state.suggestions,
        showSuggestions: state.showSuggestions
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchSuggestions: (term) => dispatch(actions.fetchSuggestions(term))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);