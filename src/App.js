import './common/common.css';
import './App.css';

import background from "./images/background_hd.png";

import Card from './Card.js';


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
	const today = new WaterData("today", "sunny", "70 F", "8AM", "20min")
	const weekCTest = new WaterData("monday", "cloudy", "50 F", "5AM", "30min")
	return ( <>
		<div id="bg-wrapper">
			<img src={background} alt="" style={{height: "auto", objectFit: "fill"} }/>
			<div id="bg-overlay"></div>
		</div>

		<header>
			<button id="nav-settings">
				<svg><use href="#icon-settings" /></svg>
			</button>
			
			<h1>Flow</h1>

			
		</header>

		<main>
			<div id="today-container">
				<Card id={today.dayName} layout="wide" data={today }/>
			</div>
			<div id="week-container">
				<Card id={weekCTest.dayName} layout="narrow" data={ weekCTest}/>
			</div>
		</main>
	 </> );
}

export default App;
