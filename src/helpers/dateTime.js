class dateTime{
    // yyyy-MM-ddThh:mm:ss => dd.MM.yyyy, hh:mm
    static beautifyDateTime(timestamp){
        if(timestamp === null || timestamp === undefined) return undefined;
        return new Date(timestamp).toLocaleString("de-ch");

    };

    // yyyy-MM-dd => dd.MM.yyyy
    static beautifyDate(date){
        if(date === null ||  date === undefined) return undefined;
        return date.split("-").reverse().join('.');
    };
}

export default dateTime;