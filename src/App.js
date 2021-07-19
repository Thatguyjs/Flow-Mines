import { Link } from "react-router-dom";

import './common/common.css';
import './App.css';

import background from "./images/background_hd.png";

import Card from './Card.js';

import ToggleButton from "./settings.js";
import RadioPanel from './radio.js';
import RadioButton from './radiob';


class WaterData {
	constructor(dayName, weather, temp, startTime, duration) {
		this.dayName = dayName;
		this.weather = weather;
		this.temp = temp;
		this.startTime = startTime;
		this.duration = duration;
	}

	/*
	this.tempUnits for future stuff.

	get tempStr() {
		return this.gTempStr();
	}

	gTempStr() {
		return temp + this.tempUnits;
	}

	get sTime() {
		return this.gSTime();
	}
	*/

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
			<ToggleButton label="test" isOn = {false} handleChange = {() => { } }/>
		</main>
	</>);

	// <RadioPanel panelName="test" selected="0" options={["0", "1", "2"]} />
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
