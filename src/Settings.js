import { Link } from "react-router-dom";

import './Settings.css';

import Storage from "./settings-components/storage.js";

import Dropdown from './settings-components/dropdown.js';
import RadioPanel from './settings-components/radio.js';
import ResetButton from './settings-components/reset.js';
import ToggleButton from './settings-components/toggle.js';
import ValueField from './settings-components/valuefield.js';

import { ToolTip, ToolTipBtn } from "./settings-components/tooltip";


// Name mapping, so components link to the correct setting
const settings_map = {
	"zip code": "zipCode",
	"square footage": "squareFootage",
	"flow rate": "sprinklerFlow",
	"temp. threshold": "tempThresh",
	"rain amt. threshold": "minRainAmt",
	"rain chance threshold": "minRainChance",
	"day skip": "daySkip",
	"auto": "daySkipAuto",
	"units": "units",
	"display": "displayFmt",
	"refresh period": "refreshPeriod",
	"time format": "timeFormat",
	"notification timing": "notifAdvance",
	"font size": "textSize"
};


// Collect all components when they're added & update them from storage if needed
function collect(component) {
	if(component instanceof ResetButton) return;

	const label = component.props.label || component.props.panelName;
	const setting_name = settings_map[label.toLowerCase()];

	const setting = Storage.get(setting_name);
	if(setting === undefined) return;

	// Not the cleanest way to do things, but .setState() doesn't appear to work before a component mounts
	if(component instanceof ValueField) {
		component.state.value = setting || '';
	}
	else if(component instanceof ToggleButton) {
		component.state.isOn = setting;
	}
	else if(component instanceof RadioPanel) {
		component.state.selected = setting;
	}
	else if(component instanceof Dropdown) {
		component.state.selected = setting;
	}
}

// Update a setting
function update(component, value) {
	const label = component.props.label || component.props.panelName;
	const setting_name = settings_map[label.toLowerCase()];

	Storage.set(setting_name, value);
	Storage.saveAll(); // Doesn't really affect performance, should be fine
}


function Settings() {
	const SFDesc = "(Non-Functional) Square feet in your lawn."
	const ZipDesc = "Zip Code is used to find weather data for your area, to calculate watering information."
	const FRDesc = "Flow Rate of Sprinklers"
	const TempThreshDesc = "If the weather is this temperature or higher do not water on this day."
	const RainAmtThreshDesc = "If rain exceeeds this amount, no watering is required. Otherwise, rainfall is removed from the target amount of watering."

	const RainChanceThreshDesc = "(Non-Functional) If rain chance is over this value, then the predicted amount of rain counts towards the rain amount threshold."
	const WindThreshDesc = "(Non-Functional) If wind speed is over this amount, do not water on that day."

	const UnitsDesc = "Sets DISPLAY units only. Settings are all in Imperial units."
	const DisplayDesc = "Sets Display Type for week."
	const TimeFmtDesc = "Sets Time format for display."

	const NonFunctional = "Not Implemented Yet."
	
	
	return ( <>
		<header>
			<Link id="nav-app" to="/">
				<svg><use href="#icon-back" /></svg>
			</Link>

			<h1>Flow</h1>
		</header>

		<main id="main-settings">
			<div id="settings-container">
				<h3 id="settings-label">SETTINGS</h3>
				<div id="settings-top">
					<ValueField placeholder="Value" label="Zip Code" cHandle={update} cInit={collect} desc= {ZipDesc}/>
					<ValueField placeholder="Value" label="Square Footage" cHandle={update} cInit={collect} desc={SFDesc}/>
					<ValueField placeholder="Value" label="Flow Rate" cHandle={update} cInit={collect} desc={FRDesc}/>
					<ValueField placeholder="Value" label="Temp. Threshold" cHandle={update} cInit={collect} desc={ TempThreshDesc}/>
					<ValueField placeholder="Value" label="Rain Amt. Threshold" cHandle={update} cInit={collect} desc={RainAmtThreshDesc}/>
					<ValueField placeholder="Value" label="Rain Chance Threshold" cHandle={update} cInit={collect} desc={RainChanceThreshDesc}/>
					<div id="setting-day-skip">
						<ValueField placeholder="Value" label="Day Skip" cHandle={update} cInit={collect} desc={NonFunctional }/>
						<ToggleButton label="Auto" isOn={true} cHandle={update} cInit={collect} desc={NonFunctional}/>
					</div>
				</div>
				<div id="settings-mid">
					<RadioPanel panelName="Units" selected="Imperial" options={["Imperial", "Metric"]} cHandle={update} cInit={collect} desc={UnitsDesc }/>
					<RadioPanel panelName="Display" selected="Wide" options={["Wide", "Narrow"]} cHandle={update} cInit={collect} desc={DisplayDesc}/>
					<ValueField placeholder="Value" label="Refresh Period" cHandle={update} cInit={collect} desc={NonFunctional }/>
					<RadioPanel panelName="Time Format" selected="12 Hour" options={["12 Hour", "24 Hour"]} cHandle={update} cInit={collect} desc={TimeFmtDesc}/>
					<ValueField placeholder="Value" label="Notification Timing" cHandle={update} cInit={collect} desc={NonFunctional}/>
				</div>
				<div id="settings-bottom">
					<Dropdown selected="Normal" options={['Small', 'Normal', 'Large']} label="Font Size" cHandle={update} cInit={collect} desc={ NonFunctional}/>
					<ResetButton cHandle={update} cInit={collect} />
				</div>
			</div>
		</main>
	</> );
}


export default Settings;
