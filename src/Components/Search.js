import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components'

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

class Search extends Component {

    constructor(props){
        super(props);
        this.state = {
            value: ''
        }
    }
    
    onKeyDownHandler = (e) => {
        this.setState({ value: e.target.value});
    }
    render() {    
        return (
            <div>
                <Wraper>
                    <WraperText>
                        <SearchInput value={this.state.value} onChange={this.onKeyDownHandler} />
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
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        query: state.query
    }
}


export default connect(mapStateToProps)(Search);