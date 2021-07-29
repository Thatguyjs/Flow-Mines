import Storage from './settings-components/storage.js'
import { cardList } from './Card.js';

const fetch = require('node-fetch');
const moment = require('moment');


class WaterData {
	constructor(dayName='', weather=null, temp=null, startTime=null, duration=null, explanation=null) {
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
		var unitIndic = "f";
		if (units === "Metric") {
			temp = Number((this.temp - 32) / 1.8).toFixed(0);
			unitIndic = "c";
		} else {
			temp = this.temp;
		}
		return temp + "°" + unitIndic.toUpperCase();
	}

	setWeather(day, temp, weather) {
		this.dayName = day;
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
			return this.startTime;
		} else if (units === "24 Hour") {
			return moment(this.startTime, ["h:mm A"]).format("HH:mm");
		} else {
			return this.startTime;
		}
	}
}


//later used to store info returned by API
const weather = {};
let advice = [
	new WaterData(),
	new WaterData(),
	new WaterData(),
	new WaterData(),
	new WaterData(),
	new WaterData(),
	new WaterData(),
	new WaterData()
];
// API Key
const key = "549d95480b954727bd5f2ff0a254e8b7";

//need a place to input zipcode (box or whatever) - then call getWeather(zip), with zip being the zipcode

// get weather from API
async function getWeather(zip) {
	let api_url = `https://api.weatherbit.io/v2.0/forecast/daily?postal_code=${zip}&units=I&key=${key}`;

	const api_res = await fetch(api_url);

	return new Promise((res, rej) => {
		api_res.json().then((info) => {
			for(let i in info.data)
				weather[i] = info.data[i];

			weather.city = info.city_name;
			weather.country = info.country_code;

			res(true);
		}).catch((err) => {
			res(false);
		});
	});
}


function convWeather(code) {
	if ((200 <= code && code <= 522) || (code === 900)) {
		return "rainy";
	} else if ((700 <= code && code <= 751) || (803 <= code && code <= 804)) {
		return "cloudy";
	} else if (code === 800) {
		return "sunny";
	} else if (801 <= code && code <= 802) {
		return "partly-cloudy";
	} else {
		return "none";
	}
}

const days = [];
function getDaysList(){
	for(let i = 0; i < 8; i++)
	{
		days[i] = {
			day: i,

			high: weather[i].max_temp,
			avg: weather[i].temp,
			low: weather[i].min_temp,

			inches: weather[i].precip,
			wind: weather[i].wind_spd,
			weather: convWeather(weather[i].weather.code),

			date: weather[i].datetime
		};
	}
}

const suffRain = "It will rain enough this week that you do not need to water your lawn.";
const freezing = "The temperature will drop below freezing. You should blow out your sprinklers.";
const cooldown = "The temperature will be above "+Storage.get('tempThresh')+" degrees today. You should water your lawn for 5 minutes to cool it off.";
const leastWindy = "This day is one of the three least windy days this week, so it is a good time to water your lawn.";


async function getAdvice() {
	// Wait for the weather data to arrive
	let success = await getWeather(Storage.zipCode);
	if(!success) return false; // Probably no Zip Code specified

	//now, when people leave these fields blank in the settings, the math will still work/do stuff
	var squareFt = Storage.get('squareFootage');
	var flowRt = 20;
	if (Storage.get('sprinklerFlow') !== null && squareFt !== null) {
		flowRt = (1/(Storage.get('sprinklerFlow')))*(squareFt)*(144/231);
	}
	var tmpThresh = 90;
	if (Storage.get('tempThresh') !== null) {
		tmpThresh = Storage.get('tempThresh');
	}
	var rainAmtThresh = 1;
	if (Storage.get('minRainAmt') !== null) {
		rainAmtThresh = Storage.get('minRainAmt');
	}
	var rainChanceThresh = Storage.get('minRainChance');


	getDaysList();

	for (let i = 0; i < 8; i++){
		var corrDay = days[i];
		var dateBits = corrDay.date.split('-');
		var date = new Date(dateBits[0], dateBits[1] - 1, dateBits[2]);

		advice[i].setWeather(date.toDateString().substring(0, 3), corrDay.avg, corrDay.weather);
		advice[i].setAdvice("n/a", 0, null);
	}

	var totalInches = rainAmtThresh;
	var projectedPrecip = days.reduce((total, obj) => obj.inches + total, 0);

	//checks if there will be enough precipitation that the user doesn't need to water their lawn
	if (projectedPrecip >= rainAmtThresh) {
		for(let i = 0; i < 8; i++) {
			advice[i].setAdvice("n/a", 0, suffRain);
		}

		applyAdvice();
		return;
	}
	//if there is only some precipitation, subtract that amount from the total desired inch
	totalInches = totalInches - projectedPrecip;

	// could be a lot less sloppy with memory by only taking the necessary parametres, but eh.
	let windDays = [...days];

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
	var totalMins = totalInches * flowRt;
	var minsPerDay = totalMins / 3; // this is where flow rate can be set

	for (let i = 0; i < 8; i++){
		if(days[i].low <= 32) {
			advice[i].setAdvice("n/a", 0, freezing);
		}
		if(days[i].high >= tmpThresh) {
			advice[i].setAdvice("6 am", 5, cooldown);
		}
	}

	for(let d in lowestWindDays) {
		let dayIdx = lowestWindDays[d].day;

		advice[dayIdx].setAdvice("6 am", minsPerDay, leastWindy);
	}

	applyAdvice();
}


// Update cards with the weather advice
function applyAdvice() {
	advice[0].dayName = "Today";

	for(let i in advice) {
		advice[i].temp = Math.round(advice[i].temp);
	}

	// Although they have no state, this seems to work
	for(let c in cardList) {
		cardList[c].setState({});
	}
}


export { WaterData, getAdvice, advice };
