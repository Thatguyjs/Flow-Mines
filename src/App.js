import { Link } from "react-router-dom";

import './common/common.css';
import './App.css';

import background from "./images/background_hd.png";

import Card from './Card.js';

import ToggleButton from "./settings-components/settings.js";
import RadioPanel from './settings-components/radio.js';
import RadioButton from './settings-components/radiob';

import Dropdown from "./settings-components/dropdown.js";

import ValueField from './settings-components/valuefield';

class WaterData {
	constructor(dayName, weather, temp, startTime, duration) {
		this.dayName = dayName;
		this.weather = weather;
		this.temp = temp;
		this.startTime = startTime;
		this.duration = duration;
	}


	// base unit is always fahrenheit

	/*
	get tempStr(units) {
		return this.gTempStr(units);
	}

	gTempStr(units) {
		if (units.equals("c")){
			temp = (this.temp - 32)/1.8
		} else {
			temp = this.temp
		}
		return temp + units;
	}
	*/

	get sTime() {
		return this.gSTime();
	}

	gWeatherColor() {
		if (this.temp >= 70) {
			// return value + modification
		} else if (this.temp >= 50) {
			
		} else if (this.temp > 32) {
			
		} else {
			
		}
	}

}


function App() {
	const today = new WaterData("today", "sunny", "70 °F", "8:00 AM", "20 min");

	const week = [
		new WaterData("monday", "cloudy", "50 °F", "5:00 AM", "30 min"),
		new WaterData("tuesday", "cloudy", "50 °F", "5:00 AM", "30 min"),
		new WaterData("wednesday", "cloudy", "50 °F", "5:00 AM", "30 min"),
		new WaterData("thursday", "cloudy", "50 °F", "5:00 AM", "30 min"),
		new WaterData("friday", "cloudy", "50 °F", "5:00 AM", "30 min"),
		new WaterData("saturday", "cloudy", "50 °F", "5:00 AM", "30 min"),
		new WaterData("sunday", "cloudy", "50 °F", "5:00 AM", "30 min")
	];

	return ( <>
		<div id="bg-wrapper">
			<img src={background} alt="" style={{height: "auto", objectFit: "fill"} }/>
			<div id="bg-overlay"></div>
		</div>

		<header>
			<Link id="nav-settings" to="/settings">
				<svg><use href="#icon-settings" /></svg>
			</Link>

			<h1>Flow</h1>
		</header>

		<main>
			<div id="today-container">
				<Card id={today.dayName} layout="wide" data={today}/>
			</div>
			<div id="week-container">
				<Card id={week[0].dayName} layout="narrow" data={week[0]}/>
				<Card id={week[1].dayName} layout="narrow" data={week[1]}/>
				<Card id={week[2].dayName} layout="narrow" data={week[2]}/>
				<Card id={week[3].dayName} layout="narrow" data={week[3]}/>
				<Card id={week[4].dayName} layout="narrow" data={week[4]}/>
				<Card id={week[5].dayName} layout="narrow" data={week[5]}/>
				<Card id={week[6].dayName} layout="narrow" data={week[6]}/>
			</div>
			<Dropdown selected="0" options={["0", "1", "2"]} label="test" cHandle={() => { } }/>
		</main>
	</>);

	// <RadioPanel panelName="test" selected="0" options={["0", "1", "2"]} />
	// <ToggleButton label="test" isOn = {false} handleChange = {() => { } }/>
	// <ValueField value="test" label="name" cHandle={() => { } }/>
}


function Settings() {
	return ( <>
		<header>
			<Link id="nav-app" to="/">
				<svg><use href="#icon-back" /></svg>
			</Link>

			<h1>Flow</h1>
		</header>

		<main>
			<h1>Test</h1>
		</main>
	</> );
}


export { App, Settings };
