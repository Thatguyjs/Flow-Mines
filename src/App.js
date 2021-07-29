import { Link } from "react-router-dom";
import React from "react";
import './common/common.css';
import './App.css';

import background from "./images/background_hd.png";

import { Card } from './Card.js';
import { getAdvice, advice } from './WeatherAPIMod.js'
import Storage from './settings-components/storage.js'


getAdvice().catch((err) => {
	console.warn("Error getting advice:", err);
});

class App extends React.Component{

	constructor(props) {
		super(props);
		this.layout = Storage.get("displayFmt").toLowerCase();
	}

	getWeekItems = list => {
		var newList = [...list]
		newList.shift();
		return newList.map(this.makeItem);
	}

	makeItem = input => {
		return <Card id={input.dayName} layout={this.layout} data={input}/>
	}

	render() {


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
					<div className={"week-container week-container-" + this.layout}>
						{this.getWeekItems(advice)}
					</div>
				</div>
			</main>
		</>);
	}
	
	// <Dropdown selected="0" options={["0", "1", "2"]} label="test" cHandle={() => { } }/>
	// <RadioPanel panelName="test" selected="0" options={["0", "1", "2"]} cHandle={() => { } }/>
	// <ValueField value="test" label="name" cHandle={() => { } }/>
}


export default App;
