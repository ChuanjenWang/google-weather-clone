import * as actionTypes from '../actions/actionTypes';

const initialState = {
    query: '',
    suggestions: [ 
        { cityName: 'Taipei', country: 'Taiwan', countryCode: 'TW', cityCode: '1668341', state: '' ,lng: '121.53185', lat:'25.04776'},
        { cityName: 'Taoyuan', country: 'Taiwan', countryCode: 'TW', cityCode: '6696918', state: '',lng: '121.53185', lat:'25.04776'},
        { cityName: 'Hsinchu', country: 'Taiwan', countryCode: 'TW', cityCode: '1675151', state: '',lng: '121.53185', lat:'25.04776'},
        { cityName: 'Taichung', country: 'Taiwan', countryCode: 'TW', cityCode: '1668399', state: '',lng: '121.53185', lat:'25.04776'},
        { cityName: 'Kaohsiung', country: 'Taiwan', countryCode: 'TW', cityCode: '1673820', state: '',lng: '121.53185', lat:'25.04776'}
        ],
    currentState: '',
    currentCountry: '',
    fetching: false,
    showSuggestions: false
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SERACH_START:
        return {
            ...state,
            q:action.query
        }
        case actionTypes.FETCH_SUGGESTIONS_SUCCESS:
        return {
            ...state,
            suggestions: action.payload,
            fetching: false,
            showSuggestions: true
        }
        case actionTypes.SET_CITY_INFO:
        return {
            ...state,
            currentState: action.payload.state,
            currentCountry: action.payload.country,
        }
        default:
        return state;
    }
}

export default reducer;