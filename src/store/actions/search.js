import axios from 'axios';

import * as actionTypes from '../actions/actionTypes';
import { CITY_API } from '../../Apis/index';

export const fetchSuggestions = (term) => {
    return dispatch => {
        const FETCH_URL = CITY_API(term); 
        axios.get(FETCH_URL)
            .then((response)=> {
                //console.log(response);
                const citys = response.data.geonames.map((item) => {
                    return {
                        cityName: item.name, 
                        country: item.countryName, 
                        countryCode: item.countryCode, 
                        cityCode: item.geonameId, 
                        state: item.adminCode1,
                        lng: item.lng,
                        lat: item.lat,
                    }
                });
                //console.log('payload:' + citys);
                dispatch(fetchSuggestionsSuccess(citys));
            })
            .catch((err) => {
                console.log(err);
            })
    }
}

export const fetchSuggestionsSuccess = (data) => {
    return {
        type: actionTypes.FETCH_SUGGESTIONS_SUCCESS,
        payload: data
    }
}
