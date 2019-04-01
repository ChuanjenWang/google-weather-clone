export const UpperPrefix = (text) => {
    if (text === null || text ==='') return '';
    const arr = text.split(' ');

    return arr.map((item) => item.substring(0,1).toUpperCase() + item.substring(1)).join(' ');
}