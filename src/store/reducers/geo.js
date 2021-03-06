import * as actionTypes from '../actions/actionTypes';
import { DateTimeText } from '../../Util/text';

const initialState = {
    localdt: '',
    dstOffset: 0
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_TIMEZONE_SUCCUESS:
            return {
                ...state,
                localdt: action.payload.time,
                dstOffset: action.payload.dstOffset,
            }
        case actionTypes.FETCH_TIMEZONE_FAIL:
            const date = new Date();
            const dtText = DateTimeText(date); 
            return {
                ...state,
                localdt: dtText
            }
        default:
            return state;
    }
}

export default reducer;