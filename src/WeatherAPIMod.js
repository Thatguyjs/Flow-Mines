
'use strict'
import Storage from './settings-components/storage.js';
const fetch = require('node-fetch');
const moment = require('moment');



class WaterData {
    constructor(dayName, weather = null, temp = null, startTime = null, duration = null, explanation = null) {
        this.dayName = dayName;
        this.weather = weather;
        this.temp = temp;
        this.startTime = startTime;
        this.duration = duration;
        this.explanation = explanation;
    }

    // base unit is always fahrenheit
    gTempStr(units) {
        var temp;
        var unitLetter = "f";
        if (units === "Metric") {
            temp = Number((this.temp - 32) / 1.8 ).toFixed(0)
            unitLetter = "c";
        } else {
            temp = this.temp
        }
        return temp + "°" + unitLetter.toUpperCase();
    }
    
    setWeather(temp, weather) {
        this.temp = temp;
        this.weather = weather;
    }

    setAdvice( time, duration, expl) {
        this.startTime = time;
        this.duration = duration;
        this.explanation = expl;
    }

    gTimeStr(units) {
        if (this.startTime === "n/a") {
            return this.startTime
        } else if (units == "24 Hour") {
            return moment(this.startTime, ["h:mm A"]).format("HH:mm")
        } else {
            return this.startTime
        }
    }
}



//see displayWeather() for more possible constructors to put here,
//depending how we structure our program overall.

//later used to store info returned by API
const weather = {};
var advice = {
    0: new WaterData("monday"),
    1: new WaterData("tuesday"),
    2: new WaterData("wednesday"),
    3: new WaterData("thursday"),
    4: new WaterData("friday"),
    5: new WaterData("saturday"),
    6: new WaterData("sunday")
};
// API Key
const key = "549d95480b954727bd5f2ff0a254e8b7";

//need a place to input zipcode (box or whatever) - then call getWeather(zip), with zip being the zipcode

// get weather from API
function getWeather(zip){
    let api = `https://api.weatherbit.io/v2.0/forecast/daily?postal_code=${zip}&units=I&key=${key}`;
    
    fetch(api)
        .then(function(response){
            let info = response.json();
            return info;
            
        })
        //the response is a list of lists. There is presumably an easier way to do this than the following for loop, but... The loop works.
        .then(function(info){
            for(let i=0; i<16; i++)
            {
                weather[i] = info.data[i] 
            }
            
            //weather.iconId = data.weather.icon;
            weather.city = info.city_name;
            weather.country = info.country_code;
        }).then(function(){
            console.log(getAdvice());
        });
}

getWeather("80027")
var x = new WaterData(" ", null, null, "8:00 am")
console.log(x.gTimeStr("24hr"))

function convWeather(code) {
    if ((200 <= code && code <= 522) || (code == 900)) {
        return "rainy"
    } else if ((700 <= code && code <= 751) || (803<=code && code <=804)) {
        return "cloudy"
    } else if (code == 800) {
        return "sunny"
    } else if (801 <= code && code <= 802) {
        return "partly-cloudy"
    } else {
        return "none"
    }

}

const days = [];
function getDaysList(){
    for(let i=0; i<7; i++)
    {
        days[i] = {};
        days[i].day = i;
        days[i].high = weather[i].max_temp;
        days[i].avg = weather[i].temp;
        days[i].low = weather[i].min_temp;
        days[i].inches = weather[i].precip;
        days[i].wind = weather[i].wind_spd;
        days[i].weather = convWeather(weather[i].weather.code)
    }
}

const suffRain = "It will rain enough this week that you do not need to water your lawn."
const freezing = "The temperature will drop below freezing. You should blow out your sprinklers."
const cooldown = "The temperature will be above 90 degrees today. You should water your lawn for 5 minutes to cool it off."
const leastWindy = "This day is one of the three least windy days this week, so it is a good time to water your lawn."

function getAdvice(){
    var squareFt = Storage.get('squareFootage');
    var flowRt = Storage.get('sprinklerFlow');
    var tmpThresh = Storage.get('tempThresh');
    var rainAmtThresh = Storage.get('minRainAmt');
    var rainChanceThresh = Storage.get('minRainChance');


    getDaysList();

    for (let i = 0; i < 7; i++){
        var corrDay = days[i];
        advice[i].setWeather(corrDay.avg, corrDay.weather)
    }

    var totalInches = rainAmtThresh;
    var projectedPrecip = days.reduce((total, obj) => obj.inches + total, 0)
    //checks if there will be enough precipitation that the user doesn't need to water their lawn
    
    if (projectedPrecip >= rainAmtThresh)
    {
        for(let i=0; i<7; i++)
        {
            advice[i].setAdvice("n/a",0,suffRain)
        }
        return advice;
    }
    //if there is only some precipitation, subtract that amount from the total desired inch
    totalInches = totalInches-projectedPrecip;

    // could be a lot less sloppy with memory by only taking the necessary parametres, but eh.
    let windDays = [...days]
    days.sort(function (a, b) {
        if (a.wind < b.wind) {
           return -1;
        }
        if (a.wind > b.wind) {
            return 1;
        }
        return 0;
    });

    let lowestWindDays = windDays.slice(0, 3); // amount of days returned can be changed by adjusting latter term
    
    var minsPerDay = totalInches / flowRt; // this is where flow rate can be set

    for(let d in lowestWindDays) {
        let dayIdx = lowestWindDays[d].day;

        advice[dayIdx].setAdvice("6 am", advice[dayIdx].minutes + minsPerDay, leastWindy)
    }

    for (let i = 0; i < 7; i++){
        if(days[i].low<=32)
        {
            advice[i].setAdvice("n/a", 0, freezing)
        }
        if(days[i].high >=tmpThresh)
        {
            advice[i].setAdvice("6 am", 5, cooldown)
        }
    }

    return advice;
}


export default WaterData;
