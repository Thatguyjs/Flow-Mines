import { Link } from "react-router-dom";

import './Settings.css';

import Dropdown from './settings-components/dropdown.js';
import RadioPanel from './settings-components/radio.js';
import ResetButton from './settings-components/reset.js';
import ToggleButton from './settings-components/toggle.js';
import ValueField from './settings-components/valuefield.js';


function Settings() {
	return ( <>
		<header>
			<Link id="nav-app" to="/">
				<svg><use href="#icon-back" /></svg>
			</Link>

			<h1>Flow</h1>
		</header>

		<main>
			<div id="settings-container">
				<div id="settings-top">
					<ValueField value="Value" label="Square Footage" cHandle={() => {}}/>
					<ValueField value="Value" label="Flow Rate" cHandle={() => {}}/>
					<ValueField value="Value" label="Temp. Threshold" cHandle={() => {}}/>
					<ValueField value="Value" label="??? Threshold" cHandle={() => {}}/>
					<ValueField value="Value" label="Rain Chance Threshold" cHandle={() => {}}/>
					<div id="setting-day-skip">
						<ValueField value="Value" label="Day Skip" cHandle={() => {}}/>
						<ToggleButton label="Auto" isOn={true} cHandle={() => {}}/>
					</div>
				</div>
				<div id="settings-mid">
					<Dropdown selected="7" options={['1', '2', '3', '4', '5', '6', '7']} label="Days Displayed" cHandle={() => {}}/>
					<RadioPanel panelName="Units" selected="Metric" options={["Metric", "Imperial"]} cHandle={() => {}} />
					<RadioPanel panelName="Display" selected="Wide" options={["Wide", "Narrow"]} cHandle={() => {}} />
					<ValueField value="Value" label="Refresh Period" cHandle={() => {}} />
					<RadioPanel panelName="Time Format" selected="12 Hour" options={["12 Hour", "24 Hour"]} cHandle={() => {}} />
					<ValueField value="Value" label="Notification Timing" cHandle={() => {}} />
				</div>
				<div id="settings-bottom">
					<Dropdown selected="Normal" options={['Small', 'Normal', 'Large']} label="Font Size" cHandle={() => {}} />
					<ResetButton cHandle={() => {}} />
				</div>
			</div>
		</main>
	</> );
}


export default Settings;
