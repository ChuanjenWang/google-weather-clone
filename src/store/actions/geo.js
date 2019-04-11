import axios from 'axios';
import * as actionTypes from './actionTypes';
import { TIME_ZONE_API } from '../../Apis/index';

export const fetchTargetCityLocalTime = (lat, lng) => {
    return dispatch => {
        const API_URL = TIME_ZONE_API(lat, lng);

        axios.get(API_URL)
            .then(response => {
                const payload = response.data; 
                //console.log(response);
                dispatch(fetchTargetCityLocalTimeSuccess(payload));
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export const fetchTargetCityLocalTimeSuccess = payload => {
    return {
        type: actionTypes.FETCH_TIMEZONE_SUCCUESS,
        payload
    }
}