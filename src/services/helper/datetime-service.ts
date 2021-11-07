export const isDateTimeAlreadyPast = (inputDateTime) => {
    let diff = new Date().getTime() - inputDateTime.getTime();
    if (diff > 0) {
        return true;
    }else{
        return false;
    }
}

export const getDateTimeDiffInMinutes = (start, end) => {
    let startDateTime = new Date(start);
    let stopDateTime = new Date(end);
    let timeDiff = (stopDateTime.getTime() - startDateTime.getTime()) / 1000;
    timeDiff /= 60;
    return Math.abs(Math.round(timeDiff));
}


export const isDateTimeOverlap = async (startA, endA, startB, endB) => {
    if((new Date(startA) <= new Date(endB)) && (new Date(endA) >= new Date(startB))){
        return true;
    }else{
        return false;
    } 
}

export const formatTimeStampToDateTime = async (timestamp) => {
    // let d = new Date(timestamp),
    //     dformat = [d.getMonth()+1,
    //        d.getDate(),
    //        d.getFullYear()].join('/')+' '+
    //       [d.getHours(),
    //        d.getMinutes(),
    //        d.getSeconds()].join(':');
    // return dformat;
    let d = new Date(timestamp);
    return  d.toLocaleString('en-US',{
                hour12: false
            });
}


export const dayOfWeekInThai = async (dayOfWeekEnum) => {
    if(dayOfWeekEnum == 'MONDAY'){
        return "จันทร์";
    }else if(dayOfWeekEnum == 'TUESDAY'){
        return "อังคาร";
    }else if(dayOfWeekEnum == 'WEDNESDAY'){
        return "พุธ";
    }else if(dayOfWeekEnum == 'THURSDAY'){
        return "พฤหัสบดี";
    }else if(dayOfWeekEnum == 'FRIDAY'){
        return "ศุกร์";
    }else if(dayOfWeekEnum == 'SATURDAY'){
        return "เสาร์";
    }else if(dayOfWeekEnum == 'SUNDAY'){
        return "อาทิตย์";
    }
}

export const getDateTimeWithTZ = async (datetime) => {
    let date = new Date(datetime)
    let userTimezoneOffset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - userTimezoneOffset)
}

export const getCurrentDateTimeIncrementSeconds = async (seconds = 0) => {
    let tzOffset = (new Date()).getTimezoneOffset() * 60000;
    let currentTime = (new Date(Date.now() - tzOffset))
    currentTime.setSeconds(currentTime.getSeconds() + seconds);
    let date = currentTime.toISOString().split('T')[0]
    let time = currentTime.toISOString().split('T')[1].split('.')[0]
    return `${date} ${time}`;
}

export const getCurrentDateTimeIncrementMinutes = async (minutes = 0) => {
    let tzOffset = (new Date()).getTimezoneOffset() * 60000;
    let currentTime = (new Date(Date.now() - tzOffset))
    currentTime.setMinutes(currentTime.getMinutes() + minutes);
    let date = currentTime.toISOString().split('T')[0]
    let time = currentTime.toISOString().split('T')[1].split('.')[0]
    return `${date} ${time}`;
}

export const getCurrentDateTimeIncrementHours = async (hours = 0) => {
    let tzOffset = (new Date()).getTimezoneOffset() * 60000;
    let currentTime = (new Date(Date.now() - tzOffset))
    currentTime.setHours(currentTime.getHours() + hours);
    let date = currentTime.toISOString().split('T')[0]
    let time = currentTime.toISOString().split('T')[1].split('.')[0]
    return `${date} ${time}`;
}