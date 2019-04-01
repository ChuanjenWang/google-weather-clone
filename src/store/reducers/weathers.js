import * as actionTypes from '../actions/actionTypes';

const initialState = {
    city:'',
    country: '',
    description: '',
    firstDateTime: '',
    weathers: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_WEATHERS:
        return {
            ...state
        }
        case actionTypes.FETCH_WEATHERS_SUCCESS:
        return {
            ...state,
            city: action.payload.city,
            country: action.payload.country,
            weathers: action.payload.list,
        }
        default:
        return state;
    }
}

export default reducer;