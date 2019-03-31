import * as actionTypes from '../actions/actionTypes';

const initialState = {
    query: '',
    suggestions: [ 
        { cityName: 'Taipei', country: 'Taiwan', countryCode: 'TW', cityCode: '1668341', state: ''},
        { cityName: 'Taoyuan', country: 'Taiwan', countryCode: 'TW', cityCode: '6696918', state: ''},
        { cityName: 'Hsinchu', country: 'Taiwan', countryCode: 'TW', cityCode: '1675151', state: ''},
        { cityName: 'Taichung', country: 'Taiwan', countryCode: 'TW', cityCode: '1668399', state: ''},
        { cityName: 'Kaohsiung', country: 'Taiwan', countryCode: 'TW', cityCode: '1673820', state: ''}
        ],
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
        default:
        return state;
    }
}

export default reducer;