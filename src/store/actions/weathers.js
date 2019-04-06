import axios from 'axios'; 
import fetchJsonp from 'fetch-jsonp';
import * as actionTypes from './actionTypes';
import { WEATHER_API, WEATHER_DAILY_API } from '../../Apis/index';

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
                    dispatch(fetchWeathersDaily(param, type));
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
export const fetchWeathersDaily = (param, type) => {
    return dispatch => {
        const API_URL = WEATHER_DAILY_API(param, type);

        fetchJsonp(API_URL)
            .then(response => {
                return response.json();
            })
            .then(response => {
                //console.log('fetchDaily' + response.list);
                const payload = response.list.map(item => {
                    const dt = new Date(item.dt * 1000);
                    return {
                        ...item,
                        weekIndex: dt.getDay()
                    }
                });
                dispatch(fetchWeathersDailySuccess(payload));
            })
            .catch(err => {
                console.log('fetchDaily' + err);
            })
    }
} 
export const fetchWeathersDailySuccess = payload => {
    return {
        type: actionTypes.FETCH_WEATHERS_DAILY_SUCCESS,
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

