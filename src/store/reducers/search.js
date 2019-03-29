import * as actionTypes from '../actions/actionTypes';

const initialState = {
    query: '',
    suggestions: ['Taipei, Tanwan', 'Taoyuan, Taiwan', 'Hsinchu, Taiwan', 'Taichung, Taiwan', 'Kaohsiung, Taiwan'],
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