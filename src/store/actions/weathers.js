import axios from 'axios'; 
import * as actionTypes from './actionTypes';

export const fetchWeathers = city => {
    return dispatch => {
        const API_URL = `http://api.openweathermap.org/data/2.5/forecast?&appid=ec91377281d5045796aa304831387348&q=${city}`;
        axios.get(API_URL)
            .then(response => {
                if (response.data.cod === '200') {
                    const payload = {
                        city: response.data.city.country === 'TW' ? response.data.city.name 
                        :
                        response.data.city.name + ', ' + response.data.city.country,
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

