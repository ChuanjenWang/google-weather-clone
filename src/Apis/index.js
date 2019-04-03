//CITY 
export const CITY_API = (term) => {
    return `http://api.geonames.org/searchJSON?q=${term}&maxRows=5&username=${process.env.REACT_APP_CITY}`;
} 

//TIME ZONE
export const TIME_ZONE_API = (lat, lng) => {
    return `http://api.geonames.org/timezoneJSON?formatted=true&lat=${lat}&lng=${lng}&username=${process.env.REACT_APP_CITY}&style=full`;
} 

//WEATHER API
export const WEATHER_API = (param, type='code') => {
    return type === 'name' ? `http://api.openweathermap.org/data/2.5/forecast?&appid=${process.env.REACT_APP_WEATHER}}&q=${param}`
    :
    `http://api.openweathermap.org/data/2.5/forecast?id=${param}&appid=${process.env.REACT_APP_WEATHER}`
    ;
} 
