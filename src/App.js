import { Link } from "react-router-dom";

import './common/common.css';
import './App.css';

import background from "./images/background_hd.png";

import { Card } from './Card.js';
import { WaterData, getAdvice, advice } from './WeatherAPIMod.js'
import Storage from './settings-components/storage.js'


getAdvice();

function App() {
	const week_layout = Storage.get("displayFmt").toLowerCase(); // this will be set through settings

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
					<Card id={advice[0].dayName} layout="wide" data={advice[0]}/>
				</div>
				<div className={"week-container week-container-" + week_layout}>
					<Card id={advice[1].dayName} layout={week_layout} data={advice[1]}/>
					<Card id={advice[2].dayName} layout={week_layout} data={advice[2]}/>
					<Card id={advice[3].dayName} layout={week_layout} data={advice[3]}/>
					<Card id={advice[4].dayName} layout={week_layout} data={advice[4]}/>
					<Card id={advice[5].dayName} layout={week_layout} data={advice[5]}/>
					<Card id={advice[6].dayName} layout={week_layout} data={advice[6]}/>
					<Card id={advice[7].dayName} layout={week_layout} data={advice[7]}/>
				</div>
			</div>
		</main>
	</>);

	// <Dropdown selected="0" options={["0", "1", "2"]} label="test" cHandle={() => { } }/>
	// <RadioPanel panelName="test" selected="0" options={["0", "1", "2"]} cHandle={() => { } }/>
	// <ValueField value="test" label="name" cHandle={() => { } }/>
}


export default App;
