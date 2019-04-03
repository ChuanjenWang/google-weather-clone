import axios from 'axios'; 
import * as actionTypes from './actionTypes';
import { WEATHER_API } from '../../Apis/index';

export const fetchWeathers = (param, type)  => {
    return dispatch => {
        const API_URL = WEATHER_API(param, type);

        axios.get(API_URL)
            .then(response => {
                if (response.data.cod === '200') {
                    const payload = {
                        city: formatDisplayCityName(response.data.city),
                        list: response.data.list
                    } 
                    dispatch(fetchWeathersSuccess(payload));
                } else if(response.cod === '404') {
                    // not found handling
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
}
export const fetchWeathersSuccess = payload => {
    return {
        type: actionTypes.FETCH_WEATHERS_SUCCESS,
        payload: payload
    }
}

const formatDisplayCityName = (city) => {
    let res;
    if (city.country === 'TW') {
        res = city.name ;
    } else {
        res = city.name + ', ' + city.country;
    }
    return res;
}

