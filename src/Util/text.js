import _ from 'lodash';

export const UpperPrefix = (text) => {
    if (text === null || text ==='') return '';
    const arr = text.split(' ');

    return arr.map((item) => item.substring(0,1).toUpperCase() + item.substring(1)).join(' ');
}

export const DateTimeText = (date) => {
    const year = date.getFullYear().toString();
    const month = _.padStart(date.getMonth().toString(), 2, '0'); 
    const day = _.padStart(date.getDate().toString(), 2, '0'); 
    const hour = _.padStart(date.getDate().toString(), 2, '0'); 
    const minute = _.padStart(date.getDate().toString(), 2, '0'); 
    const second = _.padStart(date.getDate().toString(), 2, '0'); 

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;

}