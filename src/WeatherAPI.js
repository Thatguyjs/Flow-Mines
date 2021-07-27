class WaterData {
	constructor(dayName, weather, temp, startTime, duration) {
		this.dayName = dayName;
		this.weather = weather;
		this.temp = temp;
		this.startTime = startTime;
		this.duration = duration;
	}

	// base unit is always fahrenheit
	gTempStr(units) {
		var temp;
		if (units === "c"){
			temp = (this.temp - 32)/1.8
		} else {
			temp = this.temp
		}
		return temp + "°" + units.toUpperCase();
	}
}

export default WaterData;
/*
//see displayWeather() for more possible constructors to put here,
//depending how we structure our program overall.

//later used to store info returned by API
const weather = {};
var advice = {
    "0": {"minutes": 0,
    "time": "",
    "explanation": ""},
    "1":{"minutes": 0,
    "time": "",
    "explanation": ""},
    "2":{"minutes": 0,
    "time": "",
    "explanation": ""},
    "3":{"minutes": 0,
    "time": "",
    "explanation": ""},
    "4":{"minutes": 0,
    "time": "",
    "explanation": ""},
    "5":{"minutes": 0,
    "time": "",
    "explanation": ""},
    "6":{"minutes": 0,
    "time": "",
    "explanation": ""}
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
                weather[i] = {};
               weather[i] = info.data[i] 
            }
            
            //weather.iconId = data.weather.icon;
            weather.city = info.city_name;
            weather.country = info.country_code;
        })
        .then(function(){
            displayWeather();
        });
}

const days = {};
function getDaysList(){
    for(let i=0; i<7; i++)
    {
        days[i] = {};
        days[i].high = weather[i].max_temp;
        days[i].low = weather[i].min_temp;
        days[i].inches = weather[i].precip;
        days[i].wind = weather[i].wind_spd;
        days[i].coldest = false;
        days[i].slowestWind = false;
        days[i].advisedMins = 0;
        days[i].adviceExp = "";
    }
}

function getAdvice(){
    getDaysList();
    totalInches = 1;
    projectedPrecip = days[0].inches+days[1].inches+days[2].inches+days[3].inches+days[4].inches+days[5].inches+days[6].inches;
//checks if there will be enough precipitation that the user doesn't need to water their lawn
    if(projectedPrecip>=1)
    {
        for(let i=0; i<7; i++)
        {
            advice[i].minutes = 0;
            advice[i].time = "n/a";
            advice[i].explanation = "It will rain enough this week that you do not need to water your lawn.";
        }
        return advice;
    }//if there is only some precipitation, subtract that amount from the total desired inch
    else{
        totalInches = totalInches-projectedPrecip;
    }
    //now we need to find out what day(s) the user should water on, based on the wind and temperature
    let lowWind = days[0].wind;
    lowTemp = days[0].high;
    lowIndex = 0;
    //this for loop finds the index of the day with the lowest wind, and adds advice based on the day's projected temperature
    for(let i=0; i<7; i++)
    {
        if(days[i].wind < lowWind){
            lowWind=days[i].wind;
            lowIndex = i;
        }
        if(days[i].low<=32)
        {
            advice[i].minutes = 0;
            advice[i].time = "n/a";
            advice[i].explanation = "The temperature will drop below freezing. You should blow out your sprinklers."
        }
        if(days[i].high >=90)
        {
            advice[i].minutes = 5;
            advice[i].time = "Between 4 and 10 am";
            advice[i].explanation = "The temperature will be above 90 degrees today. You should water your lawn for 5 minutes to cool it off."
        }
    }//this marks the lowest wind day, found by the previous for loop, as such
        days[lowIndex].slowestWind=true;

    //this if statement resets the lowWind and lowIndex for finding the next least windy day    
    if(days[0].slowestWind==true)
    {
        lowWind=days[1].wind;
        lowIndex=1;
    }
    else{
        lowWind=days[0].wind;
        lowIndex=0;
    }
    //now we repeat the process from the previous for loop, but to find the second least windy day
    for(let i=0; i<7; i++)
    {
        if(days[i].slowestWind==false){
            if(days[i].wind < lowWind){
                lowWind=days[i].wind;
                lowIndex = i;
            }
        }
    }
        days[lowIndex].slowestWind=true;
    //we need to do it one more time - let's find the third least windy day!
    if(days[0].slowestWind==true)
    {
        if(days[1].slowestWind==true)
        {
            lowWind = days[2].wind;
            lowIndex=2;
        }
        else{
        lowWind=days[1].wind;
        lowIndex=1;
        }
    }
    else{
        lowWind=days[0].wind;
        lowIndex=0;
    }
    for(let i=0; i<7; i++)
    {
        if(days[i].slowestWind==false){
            if(days[i].wind < lowWind){
                lowWind=days[i].wind;
                lowIndex = i;
            }
        }
    }
        days[lowIndex].slowestWind=true;
    //we have found which days to water on - but how much should we water?    
    minsPerDay = totalInches*20;
    //now this sets that amount of water for the least windy days
    for(let i=0; i<7; i++)
    {
        if(days[i].slowestWind==true)
        {
            advice[i].minutes = advice[i].minutes+minsPerDay;
            advice[i].time = "Between 4 and 10 am";
            advice[i].explanation = "This day is one of the three least windy days this week, so it is a good time to water your lawn."
        }
    }
    return advice;
}

// display weather to UI
function displayWeather(){
    getAdvice();
    /* I haven't converted this all to react yet, obviously. 
    But if we have stuff to display on the Card or something,
    We can use this function to return the information we want.
    For example, if we have a temperature we want to return, we 
    could have some HTML like the following in the <body> of our page: 
        <div class="container">
            <div class="app-title">
              <p>Weather</p>
            </div>
            <div class="notification"> </div>
            <div class="weather-container">
                <div class="weather-icon">
                    <img src="icons/unknown.png" alt="">
                </div>
                <div class="temperature-value">
                    <p>- °<span>F</span></p>
                </div>
                <div class="temperature-description">
                    <p> - </p>
                </div>
                <div class="location">
                    <p>-</p>
                </div>
            </div>
        </div>
        <script src="WeatherAPI.js"></script>

    And some constructors at the top of this js page, like the following,
    to define each of the fields in the HTML:
        const iconElement = document.querySelector(".weather-icon");
        const tempElement = document.querySelector(".temperature-value p");
        const descElement = document.querySelector(".temperature-description p");
        const locationElement = document.querySelector(".location p");
        const notificationElement = document.querySelector(".notification");

    Then, the following lines could define what would appear within 
    each formerly "-"-filled field in the HTML:
        tempElement.innerHTML = `${weather[0].max_temp}`;
        escElement.innerHTML = weather[1].pop;
        locationElement.innerHTML = `${weather.city}, ${weather.country}`;
    
    We can get the projected precipitation for a day with 
        weather[daynumber(0 for today,up to 15)].precip,
    the projected wind for a day with weather[daynumber].wind_spd,
    the low temperature with weather[daynumber].min_temp or .low_temp
    Other options are here: https://www.weatherbit.io/api/weather-forecast-16-day
    
}
*/