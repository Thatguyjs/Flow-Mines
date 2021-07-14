import './common/common.css';
import './App.css';

import background from "./images/background_hd.png";

import Card from './Card.js';


function App() {
	return ( <>
		<div id="bg-wrapper">
			<img src={background} alt="" />
			<div id="bg-overlay"></div>
		</div>

		<header>
			<h1>Flow</h1>

			<button id="nav-settings">
				<svg><use href="#icon-settings" /></svg>
			</button>
		</header>

		<main>
			<div id="today-container">
				<Card id="today" layout="wide" label="Today" weather="sunny" temperature="80 F"/>
			</div>
			<div id="week-container"></div>
		</main>
	 </> );
}

export default App;
