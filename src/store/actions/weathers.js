import axios from 'axios'; 
import fetchJsonp from 'fetch-jsonp';
import * as actionTypes from './actionTypes';
import * as actions from './index';
import { WEATHER_API, WEATHER_DAILY_API } from '../../Apis/index';
import {formatWeathersDaily} from '../../Util/weather';

export const fetchWeathers = (param, type)  => {
    return async dispatch => {
        try {
            const API_URL = WEATHER_API(param, type);
            const response = await axios.get(API_URL);
    
            if (response.data.cod === '200') {
                const payload = {
                    city: response.data.city.name,
                    country: response.data.city.country,
                    lat: response.data.city.coord.lat,
                    lng: response.data.city.coord.lon,
                    list: response.data.list
                }
                //fix list to 39
                if (payload.list.length > 39) {
                    payload.list = payload.list.slice(0, 39);
                }else if (response.data.list.length < 39) {
                    while (response.data.list.length < 39) {
                        payload.list.push(payload.list[payload.list.length-1]);
                    }
                }
                dispatch(fetchWeathersSuccess(payload));
                dispatch(actions.fetchTargetCityLocalTime(response.data.city.coord.lat, response.data.city.coord.lon));
                dispatch(fetchWeathersDaily(param, type, 2));
            } else if(response.cod === '404') {
                // not found handling
                console.log('not found handling');
            }
        } catch(err) {
            console.log(err);
        }
    }
}
export const fetchWeathersSuccess = payload => {
    return {
        type: actionTypes.FETCH_WEATHERS_SUCCESS,
        payload: payload
    }
}
export const fetchWeathersDaily = (param, type, retry=0) => {
    if (retry === 0) return;
    return async dispatch => {
        
        try {
            const API_URL = WEATHER_DAILY_API(param, type);
            const response = await fetchJsonp(API_URL);
            const resJson = await response.json();
            const payload = resJson.list;
            
            
            dispatch(fetchWeathersDailySuccess(formatWeathersDaily(payload)));

        } catch(err) {
            console.log('fetchDaily' + err);
            dispatch(fetchWeathersDaily(param, type, retry -1));
        }
    }
} 
export const fetchWeathersDailySuccess = payload => {
    return {
        type: actionTypes.FETCH_WEATHERS_DAILY_SUCCESS,
        payload: payload
    }
}


