export const getTimePeriod = () => {
    const _MS_PER_HOUR = 60 * 60 * 1000;
    const curDateTime = new Date();
    const referDateTime = new Date(curDateTime.getFullYear() + '-' + (curDateTime.getMonth() + 1) + '-' + curDateTime.getDate());
    const hoursDiff = (curDateTime - referDateTime) / _MS_PER_HOUR;
    let period = 1;

    // 2-5   -> 1
    // 5-8   -> 2
    // 8-11   -> 3
    // 11-14  -> 4
    // 14-17 -> 5
    // 17-20 -> 6
    // 20-23 -> 7
    // 23-2 -> 8

    if (hoursDiff >= 0 && hoursDiff <= 1.5) {
        period = 1;
    } else if (hoursDiff > 1.5 && hoursDiff <= 4.5) {
        period = 2;
    } else if (hoursDiff > 4.5 && hoursDiff <= 7.5) {
        period = 3;
    } else if (hoursDiff > 7.5 && hoursDiff <= 10.5) {
        period = 4;
    } else if (hoursDiff > 10.5 && hoursDiff <= 13.5) {
        period = 5;
    } else if (hoursDiff > 13.5 && hoursDiff <= 16.5) {
        period = 6;
    } else if (hoursDiff > 16.5 && hoursDiff <= 19.5) {
        period = 7;
    } else if (hoursDiff > 19.5 && hoursDiff <= 22.5) {
        period = 8;
    } else if (hoursDiff > 22.5 && hoursDiff <= 24) {
        period = 1;
    }

    return period;
}

export const getWeekandTime = (dateText) => {
    let res;
    const date = new Date(dateText);

    res = getWeekName(date.getDay()) + ' ' + getFormatTimeFromSec(date);

    return res;
}

export const convertDegrees = (unit, kelvin) => {
    console.log('kelvin:' + kelvin);
    console.log('c:' + Math.floor(kelvin -  273.15));
    console.log('f:' + Math.ceil(Math.floor(kelvin - 273.15) * 1.8 + 32));
    return unit === 'C' ? Math.floor(kelvin -  273.15) : Math.ceil(Math.floor(kelvin - 273.15) * 1.8 + 32);
}

export const getImageFromWeatherCode = (code) => {
    if(!code) return '';

    let iconName = '';
    const pre = code.toString().substring(0,1);

    switch(pre) {
        case '2':
        iconName = 'thunderstorms.png';
        break;
        
        case '3':
        iconName = 'rain_light.png';
        break;
        
        case '5':
        iconName = 'rain.png';
        break;
        
        case '6':
        iconName = 'snow.png';
        break;
        
        case '7':
        iconName = 'mist.png';
        break;
        
        case '8':
        iconName = 'sunny.png';
        break;
        
        default:
        break;
    }

    switch (code) {
        case 500:
        case 501:
        iconName = 'rain_s_sunny.png';
        break;
        
        case 520:
        case 521:
        case 522:
        iconName = 'rain_s_cloudy.png';
        break;

        case 615:
        case 616:
        iconName = 'snow_s_rain.png';
        break;

        case 801:
        iconName = 'partly_cloudy.png';
        break;

        case 802:
        case 803:
        case 804:
        iconName = 'cloudy.png';
        break;

        default:
        break;
    }

    return iconName;
}

export const getWeekName = (day) => {
    switch(day) {
        case 0:
        return 'Sunday';
        case 1:
        return 'Monday';
        case 2:
        return 'Tuesday';   
        case 3:
        return 'Wednesday';
        case 4:
        return 'Thursday';
        case 5:
        return 'Friday';
        case 6:
        return 'Saturday';
        default:
        return 'Sunday';
    }
} 

const getFormatTimeFromSec = (date) => {
    const hours = date.getHours(date);
    return hours <=12 ? `${hours}:00 AM` : `${hours - 12}:00 PM` 
}

