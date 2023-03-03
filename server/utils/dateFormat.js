
module.exports = (
    timestamp,
    { monthLength = 'short'} = {}
) => {
    // crear objeto de mes
    const months = {
        0: monthLength === 'short' ? 'Ene' : 'Enero',
        1: monthLength === 'short' ? 'Feb' : 'February',
        2: monthLength === 'short' ? 'Mar' : 'March',
        3: monthLength === 'short' ? 'Apr' : 'April',
        4: monthLength === 'short' ? 'May' : 'May',
        5: monthLength === 'short' ? 'Jun' : 'June',
        6: monthLength === 'short' ? 'Jul' : 'July',
        7: monthLength === 'short' ? 'Aug' : 'August',
        8: monthLength === 'short' ? 'Sep' : 'September',
        9: monthLength === 'short' ? 'Oct' : 'October',
        10: monthLength === 'short' ? 'Nov' : 'November',
        11: monthLength === 'short' ? 'Dec' : 'December',
    };

    const dateObj = new Date(timestamp);
    const formattedMonth = months[dateObj.getMonth()];

    const dayOfMonth = dateObj.getDate().toString;
      
    const year = dateObj.getFullYear();
    
    
    
    
    
    /*let hour =
        dateObj.getHours() > 12
            ? Math.floor(dateObj.getHours() - 12)
            : dateObj.getHours();

    // si la hora es 0 (12:00 a. m.), cámbiela a 12
    if (hour === 0) {
        hour = 12;
    }

    const minutes = (dateObj.getMinutes() < 10 ? '0' : '') + dateObj.getMinutes();

    // establecer `am` o `pm`
    const periodOfDay = dateObj.getHours() >= 12 ? 'pm' : 'am';
*/
    const formattedTimeStamp = `${dayOfMonth} / ${formattedMonth} / ${year}`;

    return formattedTimeStamp;
};
