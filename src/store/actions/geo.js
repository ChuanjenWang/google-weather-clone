import axios from 'axios';
import * as actionTypes from './actionTypes';
import { TIME_ZONE_API } from '../../Apis/index';

export const fetchTargetCityLocalTime = (lat, lng) => {
    return async dispatch => {

        try {
            const API_URL = TIME_ZONE_API(lat, lng);
            const response = await axios.get(API_URL);
            const payload = response.data; 
            
            dispatch(fetchTargetCityLocalTimeSuccess(payload));
        } catch(err) {
            console.log(err);
        }
    }
}

export const fetchTargetCityLocalTimeSuccess = payload => {
    return {
        type: actionTypes.FETCH_TIMEZONE_SUCCUESS,
        payload
    }
}