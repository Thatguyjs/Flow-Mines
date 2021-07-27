import { Link } from "react-router-dom";

import './common/common.css';
import './App.css';

import background from "./images/background_hd.png";

import Card from './Card.js';

import RadioPanel from './settings-components/radio.js';
import RadioButton from './settings-components/radiob.js';
import Dropdown from "./settings-components/dropdown.js";
import ValueField from './settings-components/valuefield.js';
import WaterData from './WeatherAPIMod.js'

function App() {
	const today = new WaterData("today", "sunny", 91, "8:00 AM", "20 min");

	const week = [
		new WaterData("monday", "sunny", 60, "5:00 AM", "30 min"),
		new WaterData("tuesday", "partly-cloudy", 53, "5:00 AM", "30 min"),
		new WaterData("wednesday", "cloudy", 62, "5:00 AM", "30 min"),
		new WaterData("thursday", "rainy", 41, "5:00 AM", "30 min"),
		new WaterData("friday", "cloudy", 67, "5:00 AM", "30 min"),
		new WaterData("saturday", "cloudy", 58, "5:00 AM", "30 min"),
		new WaterData("sunday", "cloudy", 80, "5:00 AM", "30 min")
	];

	const week_layout = "narrow"; // this will be set through settings
	return ( <>
		<div id="bg-wrapper">
			<img src={background} alt="" style={{height: "max(100vh, 100vw)", objectFit: "fill"} }/>
			<div id="bg-overlay"></div>
		</div>

		<header>
			<Link id="nav-settings" to="/settings">
				<svg><use href="#icon-settings" /></svg>
			</Link>

			<h1>Flow</h1>
		</header>

		<main>
			<div id = "content-container">
				<div id="today-container">
					<Card id={today.dayName} layout="wide" data={today}/>
				</div>
				<div className={"week-container " + "week-container-" + week_layout}>
					<Card id={week[0].dayName} layout={week_layout } data={week[0]}/>
					<Card id={week[1].dayName} layout={week_layout } data={week[1]}/>
					<Card id={week[2].dayName} layout={week_layout } data={week[2]}/>
					<Card id={week[3].dayName} layout={week_layout } data={week[3]}/>
					<Card id={week[4].dayName} layout={week_layout } data={week[4]}/>
					<Card id={week[5].dayName} layout={week_layout } data={week[5]}/>
					<Card id={week[6].dayName} layout={week_layout } data={week[6]}/>
				</div>
			</div>
		</main>
	</>);

	// <Dropdown selected="0" options={["0", "1", "2"]} label="test" cHandle={() => { } }/>
	// <RadioPanel panelName="test" selected="0" options={["0", "1", "2"]} cHandle={() => { } }/>
	// <ValueField value="test" label="name" cHandle={() => { } }/>
}


export default App;
