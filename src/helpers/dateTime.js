class dateTime{
    // yyyy-MM-ddThh:mm:ss => dd.MM.yyyy, hh:mm
    static beautifyDateTime(timestamp){
        if(timestamp === null || timestamp === undefined) return undefined;
        let date = timestamp.slice(0,10);
        date = date.split("-").reverse().join('.');
        let time = timestamp.slice(11,16);
        return date+', '+time;
    };

    // dd.MM.yyyy, hh:mm => yyyy-MM-ddThh:mm:ss
    static formatDateTime(timestamp){
        if(timestamp === null || timestamp === undefined) return undefined;
        if(!dateTime.checkDateTime(timestamp))return timestamp;
        const dateTimeArray = timestamp.split(', ');
        let formatted  = dateTime.formatDate(dateTimeArray[0]);
        return formatted + 'T'+dateTimeArray[1]+':00';

    }

    // yyyy-MM-dd => dd.MM.yyyy
    static beautifyDate(date){
        if(date === null ||  date === undefined) return undefined;
        return date.split("-").reverse().join('.');
    };

    // dd.MM.yyyy => yyyy-MM-dd
    static formatDate(date){
        if(date === null ||  date === undefined) return undefined;
        if(!dateTime.checkDate(date)) return date;
        const formatted = date.split(".");
        return formatted.reverse().join('-');
    };

    //allowed format: dd.MM.yyyy
    static checkDate(date){
        const dateArray = date.split('.');
        if(dateArray.length !== 3) return false; //not exactly dd.MM.yyyy
        if(dateArray[0] < 1 || dateArray[0] > 31) return false; //dd too big or too small
        if(dateArray[1] < 1 || dateArray[1] > 12) return false; //MM too big or too small
        if(dateArray[2] < 1000 || dateArray[1] > 9999) return false; //yyyy too big or too small
        return true;
    };

    //allowed format: dd.MM.yyyy, hh:mm
    static checkDateTime(timestamp){
        const dateTimeArray = timestamp.split(', ');
        if(!dateTime.checkDate(dateTimeArray[0])) return false; //date not correct
        const timeArray = dateTimeArray[1].split(':');
        if(timeArray.length !== 2) return false; //not exactly hh:mm
        if(timeArray[0] < 1 || timeArray[0] > 24) return false; //hh too big or too small
        if(timeArray[1] < 1 || timeArray[1] > 60) return false; //MM too big or too small
        return true;
    };
}

export default dateTime;