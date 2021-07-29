import { Link } from "react-router-dom";

import './Settings.css';

import Storage from "./settings-components/storage.js";

import Dropdown from './settings-components/dropdown.js';
import RadioPanel from './settings-components/radio.js';
import ResetButton from './settings-components/reset.js';
import ToggleButton from './settings-components/toggle.js';
import ValueField from './settings-components/valuefield.js';

import { ToolTip, ToolTipBtn } from "./settings-components/tooltip";

import React from "react";


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


class Settings extends React.Component {
	components_top = [
		{ type: ValueField, label: 'Zip Code', desc: 'Zip Code is used to find weather data for your area' },
		{ type: ValueField, label: 'Square Footage', desc: '(Non-Functional) Square feet in your lawn' },
		{ type: ValueField, label: 'Flow Rate', desc: 'Flow Rate of Sprinklers' },
		{ type: ValueField, label: 'Temp. Threshold', desc: 'If the weather is this temperature or higher do not water on this day' },
		{ type: ValueField, label: 'Rain Amt. Threshold', desc: 'If rain exceeeds this amount, no watering is required' },
		{ type: ValueField, label: 'Rain Chance Threshold', desc: '(Non-Functional) If rain chance is over this value, then the predicted amount of rain counts towards the rain amount threshold' },
		{ type: ValueField, label: 'Day Skip', desc: 'Not Implemented Yet' },
		{ type: ToggleButton, label: 'Auto', isOn: true, desc: 'Not Implemented Yet' }
	];

	components_mid = [
		{ type: RadioPanel, panelName: 'Units', selected: 'Imperial', options: ['Imperial', 'Metric'], desc: 'Sets DISPLAY units only. Settings are all in Imperial units' },
		{ type: RadioPanel, panelName: 'Display', selected: 'Narrow', options: ['Wide', 'Narrow'], desc: 'Sets Display Type for week' },
		{ type: ValueField, label: 'Refresh Period', desc: 'Not Implemented Yet' },
		{ type: RadioPanel, panelName: 'Time Format', selected: '12 Hour', options: ['12 Hour', '24 Hour'], desc: 'Sets Time format for display' },
		{ type: ValueField, label: 'Notification Timing', desc: 'Not Implemented Yet' }
	];

	components_bottom = [
		{ type: Dropdown, label: 'Font Size', selected: 'Normal', options: ['Small', 'Normal', 'Large'], desc: 'Not Implemented Yet' },
		{ type: ResetButton }
	];


	constructor(props) {
		super(props);

		for(let c in this.components_top) {
			this.components_top[c] = this._buildComponent(this.components_top[c]);
		}

		for(let c in this.components_mid) {
			this.components_mid[c] = this._buildComponent(this.components_mid[c]);
		}

		for(let c in this.components_bottom) {
			this.components_bottom[c] = this._buildComponent(this.components_bottom[c]);
		}
	}


	// Build a single component from a template-like object
	_buildComponent(template) {
		const type = template.type;
		delete template.type; // So the component doesn't receive it

		if(type === ValueField) {
			template.placeholder = 'Value';
		}

		const setting = this._loadSettingFor(type, template);

		if(setting !== null) {
			template[setting[0]] = setting[1];
			template.key = setting[2];
		}
		else {
			template.key = 'ResetButton'; // Should be the only one without an associated setting
		}

		const component = React.createElement(type, {
			...template,
			cHandle: this.update.bind(this)
		});

		return component;
	}


	// Load a setting for a template
	_loadSettingFor(type, template) {
		const setting_name = template.label || template.panelName;
		if(!setting_name) return null;

		const setting = Storage.get(settings_map[setting_name.toLowerCase()]);

		if(type === ValueField) {
			return ['value', setting || '', setting_name];
		}
		else if(type === ToggleButton) {
			return ['isOn', setting, setting_name];
		}
		else if(type === RadioPanel || type === Dropdown) {
			return ['selected', setting, setting_name];
		}

		return null;
	}


	// Called when a component's value changes
	update(component, value) {
		if(component instanceof ResetButton) {
			localStorage.clear();
			window.location.reload();
			return;
		}

		const label = component.props.label || component.props.panelName;
		const setting_name = settings_map[label.toLowerCase()];

		Storage.set(setting_name, value);
		Storage.saveAll(); // Doesn't really affect performance, should be fine
	}


	render() {
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
						{this.components_top}
					</div>
					<div id="settings-mid">
						{this.components_mid}
					</div>
					<div id="settings-bottom">
						{this.components_bottom}
					</div>
				</div>
			</main>
		</> );
	}
}


export default Settings;
