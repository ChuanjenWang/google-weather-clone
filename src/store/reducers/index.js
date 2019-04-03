import { combineReducers } from 'redux';

import searchReducer from './search';
import weatherReducer from './weathers';
import geoReducer from './geo';

const rootReducer = combineReducers({
    search: searchReducer,
    weather: weatherReducer,
    geo: geoReducer
})

export default rootReducer