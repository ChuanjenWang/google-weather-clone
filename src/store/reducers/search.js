import * as actionTypes from '../actions/actionTypes';

const initialState = {
    query: '',
    suggestions: [],
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

        default:
        return state;
    }
}

export default reducer;