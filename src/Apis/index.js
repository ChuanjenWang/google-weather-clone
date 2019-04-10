//CITY 
export const CITY_API = (term) => {
    return `https://api.geonames.org/searchJSON?q=${term}&maxRows=5&username=${process.env.REACT_APP_CITY}`;
} 

//TIME ZONE
export const TIME_ZONE_API = (lat, lng) => {
    return `https://api.geonames.org/timezoneJSON?formatted=true&lat=${lat}&lng=${lng}&username=${process.env.REACT_APP_CITY}&style=full`;
} 

//WEATHER API
export const WEATHER_API = (param, type='code') => {
    switch (type) {
        case 'name':
            return `https://api.openweathermap.org/data/2.5/forecast?&appid=${process.env.REACT_APP_WEATHER}&q=${param}`
        case 'location':
            const arr = param.split(',');
            return `https://api.openweathermap.org/data/2.5/forecast?&appid=${process.env.REACT_APP_WEATHER}&lat=${arr[0]}&lon=${arr[1]}`
        default:
            return `https://api.openweathermap.org/data/2.5/forecast?id=${param}&appid=${process.env.REACT_APP_WEATHER}`     
    }
} 

//WEATHER API 
export const WEATHER_DAILY_API = (param, type = 'code') => {
    return type === 'name' ? `https://openweathermap.org/data/2.5/forecast/daily/n?appid=${process.env.REACT_APP_WSUPER}&q=${param}&units=metric&cnt=8`
    :
    `https://openweathermap.org/data/2.5/forecast/daily/n?appid=${process.env.REACT_APP_WSUPER}&id=${param}&units=metric&cnt=8`
    ;
}