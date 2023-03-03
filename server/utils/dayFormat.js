module.exports = (timestamp) => {
    const dateObj = new Date(timestamp);
      let hour =
        dateObj.getHours() > 12
            ? Math.floor(dateObj.getHours() - 12)
            : dateObj.getHours();

    // si la hora es 0 (12:00 a. m.), se cambia a 12
    if (hour === 0) {
        hour = 12;
    }

    const minutes = (dateObj.getMinutes() < 10 ? '0' : '') + dateObj.getMinutes();

    // establecer `am` o `pm`
    const periodOfDay = dateObj.getHours() >= 12 ? 'pm' : 'am';

    const formattedTimeStamp = `${ hour }: ${ minutes } ${ periodOfDay }`;

    return formattedTimeStamp;
};
