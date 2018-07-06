const moment = require('moment');

//helper functions object
let helpers = {
    //Validate whether the string is a date or not 
    isValidDate: function (stringDate) {
        let date = moment(stringDate, 'YYYY/M/D');
        if (date == null || !date.isValid()) {
            return false;
        }
        return stringDate.indexOf(date.format('YYYY/M/D')) >= 0
            || stringDate.indexOf(date.format('YYYY/MM/DD')) >= 0
            || stringDate.indexOf(date.format('YYYY/M/D')) >= 0
            || stringDate.indexOf(date.format('YYYY/MM/DD')) >= 0;
    },

    //check whether password is valid or not
    isValidPassword: function (password) {
        let criteria = 0;
        if (password.toUpperCase() != password) {
            // has lower case letters
            criteria++;
        }
        if (password.toLowerCase() != password) {
            // has upper case letters
            criteria++;
        }
        // if (/^[a-zA-Z0-9]*$/.test(password) === false) {
        //     // has special characters
        //     criteria++;
        // }
        if (/\d/.test(password) === true) {
            // has numbers
            criteria++;
        }
        // returns true if 3 or more criteria was met and length is appropriate
        return (criteria >= 3 && password.length >= 8);
    },
    //Check whether the object is empty or not:
    isObjectEmpty: function isEmpty(obj) {
        for (let prop in obj) {
            if (obj.hasOwnProperty(prop))
                return false;
        }
        return JSON.stringify(obj) === JSON.stringify({});
    },
    getCurrentDate: function () {
        return new Date().toJSON().slice(0, 10).replace(/-/g, '/');
    },
    getCurrentDateTime: function () {
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date + ' ' + time;
        return dateTime;
    },
    convertTime12to24: function (time12h) {
        const [time, modifier] = time12h.split(' ');
        let [hours, minutes] = time.split(':');
        if (hours === '12') {
            hours = '00';
        }
        if (modifier === 'PM') {
            hours = parseInt(hours, 10) + 12;
        }
        return hours + ':' + minutes;
    },
    isValidTime: function (time) {
        let reg = new RegExp("^([0]?[1-9]|[1][0-2]):([0-5][0-9]|[1-9]) [AP]M$");
        if (reg.exec(time)) {
            return true;
        } else {
            return false;
        }
    },
    isValidDay: function (day) {
        let checkDay = day.toLowerCase();
        if (checkDay === 'monday' || day === 'tuesday' ||
            checkDay === 'wednesday' || day === 'thursday' ||
            checkDay === 'friday' || day === 'saturday' ||
            checkDay === 'sunday'
        ) {
            return true;
        } else {
            return false;
        }
    },
    validateZipCode: function (elementValue){
        var zipCodePattern = /^\d{5}$|^\d{5}-\d{4}$/;
         return zipCodePattern.test(elementValue);
    },
    capitalize: function (string){
        return string.toLowerCase().replace( /\b./g, function(a){ return a.toUpperCase(); } );
    },
    isValidIp: function ValidateIPaddress(ipaddress) {  
        if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {  
          return (true)  
        }  
        return (false)  
      }
}

module.exports = helpers;
